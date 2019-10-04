import {useNavigation} from '@react-navigation/core'
import React, {useCallback} from 'react'
import {FlatList} from 'react-native'
import {useSelector} from 'react-redux'

import {ScreenName} from 'src/const'
import {useBrowserManager} from 'src/hooks'
import {historyHook, historySelector} from 'src/redux/module/history'
import {Item} from './item'
import {NoItems} from './no-items'

export function HistoryScreen() {
  const {openLink} = useBrowserManager()
  const histories = useSelector(historySelector.getHistories)
  const {removeHistory} = historyHook.useHistoryManager()
  const navigation = useNavigation()

  const onPressFactory = useCallback(
    (url: string) => () => {
      openLink(url)
      navigation.navigate(ScreenName.BrowserScreen)
    },
    [navigation, openLink],
  )

  const onRemoveFactory = useCallback(
    (hsitoryId: string) => () => {
      removeHistory(hsitoryId)
    },
    [removeHistory],
  )

  if (histories.length === 0) {
    return <NoItems />
  }

  return (
    <FlatList
      data={histories}
      keyExtractor={item => item.id}
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
