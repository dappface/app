import * as React from 'react'
import { FlatList } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useMappedState } from 'redux-react-hook'
import { Item } from 'src/components/screens/links/item'
import { NoItems } from 'src/components/screens/links/no-items'
import { IListProps } from 'src/components/screens/links/type'
import { useBrowserManager } from 'src/hooks'
import { IState } from 'src/redux/module'
import { historyHook, historySelector } from 'src/redux/module/history'

export const HistoryList = ({ screenProps: { componentId } }: IListProps) => {
  const { openLink } = useBrowserManager()
  const mapState = React.useCallback(
    (state: IState) => ({
      histories: historySelector.getHistories(state)
    }),
    []
  )
  const { histories } = useMappedState(mapState)
  const { removeHistory } = historyHook.useHistoryManager()

  const onPressFactory = React.useCallback(
    (url: string) => () => {
      openLink(url)
      void Navigation.dismissModal(componentId)
    },
    [componentId, openLink]
  )

  const onRemoveFactory = React.useCallback(
    (hsitoryId: string) => () => {
      removeHistory(hsitoryId)
    },
    [removeHistory]
  )

  if (histories.length === 0) {
    return <NoItems />
  }

  return (
    <FlatList
      data={histories}
      keyExtractor={item => item.id}
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
