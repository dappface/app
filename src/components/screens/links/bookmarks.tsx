import {useNavigation} from '@react-navigation/core'
import React, {useCallback} from 'react'
import {FlatList} from 'react-native'
import {useSelector} from 'react-redux'

import {ScreenName} from 'src/const'
import {useBrowserManager} from 'src/hooks'
import {bookmarkHook, bookmarkSelector} from 'src/redux/module/bookmark'
import {Item} from './item'
import {NoItems} from './no-items'

export function BookmarksScreen() {
  const {openLink} = useBrowserManager()
  const bookmarks = useSelector(bookmarkSelector.getBookmarks)
  const {removeBookmark} = bookmarkHook.useBookmarkManager()
  const navigation = useNavigation()

  const onPressFactory = useCallback(
    (url: string) => () => {
      openLink(url)
      navigation.navigate(ScreenName.BrowserScreen)
    },
    [navigation, openLink],
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
