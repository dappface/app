import React, {useCallback} from 'react'
import {FlatList} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {useSelector} from 'react-redux'
import {Item} from 'src/components/screens/links/item'
import {NoItems} from 'src/components/screens/links/no-items'
import {IListProps} from 'src/components/screens/links/type'
import {useBrowserManager} from 'src/hooks'
import {bookmarkHook, bookmarkSelector} from 'src/redux/module/bookmark'

export function BookmarkList({screenProps: {componentId}}: IListProps) {
  const {openLink} = useBrowserManager()
  const bookmarks = useSelector(bookmarkSelector.getBookmarks)
  const {removeBookmark} = bookmarkHook.useBookmarkManager()

  const onPressFactory = useCallback(
    (url: string) => () => {
      openLink(url)
      Navigation.dismissModal(componentId)
    },
    [componentId, openLink],
  )

  const onRemoveFactory = useCallback(
    (bookmarkId: string) => () => {
      removeBookmark(bookmarkId)
    },
    [removeBookmark],
  )

  if (bookmarks.length === 0) {
    return <NoItems />
  }

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={bookmarks}
      renderItem={({item}) => (
        <Item
          item={item}
          onPress={onPressFactory(item.url)}
          onRemove={onRemoveFactory(item.id)}
        />
      )}
    />
  )
}
