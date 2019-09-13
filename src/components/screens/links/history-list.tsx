import React, {useCallback} from 'react'
import {FlatList} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {useSelector} from 'react-redux'
import {Item} from 'src/components/screens/links/item'
import {NoItems} from 'src/components/screens/links/no-items'
import {IListProps} from 'src/components/screens/links/type'
import {useBrowserManager} from 'src/hooks'
import {historyHook, historySelector} from 'src/redux/module/history'

export function HistoryList({screenProps: {componentId}}: IListProps) {
  const {openLink} = useBrowserManager()
  const histories = useSelector(historySelector.getHistories)
  const {removeHistory} = historyHook.useHistoryManager()

  const onPressFactory = useCallback(
    (url: string) => () => {
      openLink(url)
      Navigation.dismissModal(componentId)
    },
    [componentId, openLink],
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
