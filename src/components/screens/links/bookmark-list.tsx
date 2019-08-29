import * as React from 'react'
import { FlatList } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useMappedState } from 'redux-react-hook'
import { Item } from 'src/components/screens/links/item'
import { NoItems } from 'src/components/screens/links/no-items'
import { IListProps } from 'src/components/screens/links/type'
import { useBrowserManager } from 'src/hooks'
import { IState } from 'src/redux/module'
import { bookmarkHook, bookmarkSelector } from 'src/redux/module/bookmark'

export const BookmarkList = ({ screenProps: { componentId } }: IListProps) => {
  const { openLink } = useBrowserManager()
  const mapState = React.useCallback(
    (state: IState) => ({
      bookmarks: bookmarkSelector.getBookmarks(state)
    }),
    []
  )
  const { bookmarks } = useMappedState(mapState)
  const { removeBookmark } = bookmarkHook.useBookmarkManager()

  const onPressFactory = React.useCallback(
    (url: string) => () => {
      openLink(url)
      void Navigation.dismissModal(componentId)
    },
    [componentId, openLink]
  )

  const onRemoveFactory = React.useCallback(
    (bookmarkId: string) => () => {
      removeBookmark(bookmarkId)
    },
    [removeBookmark]
  )

  if (bookmarks.length === 0) {
    return <NoItems />
  }

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={bookmarks}
      renderItem={({ item }) => (
        <Item
          item={item}
          onPress={onPressFactory(item.url)}
          onRemove={onRemoveFactory(item.id)}
        />
      )}
    />
  )
}
