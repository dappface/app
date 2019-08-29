import * as React from 'react'
import { FlatList } from 'react-native'
import { Button, Caption, Card } from 'react-native-paper'
import { useMappedState } from 'redux-react-hook'
import { Expanded, Padding } from 'src/components/atoms'
import {
  IProps as IItemProps,
  Item
} from 'src/components/screens/wallet/token-list/item'
import { pushTokenSearch } from 'src/navigation'
import { IState } from 'src/redux/module'
import { tokenSelector } from 'src/redux/module/token'
import { uiHook, uiType } from 'src/redux/module/ui'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
}

export const TokenList = ({ componentId }: IProps) => {
  const mapState = React.useCallback(
    (state: IState) => ({
      tokens: tokenSelector.getCurrentAccountTokens(state)
    }),
    []
  )
  const { tokens } = useMappedState(mapState)
  const setBottomDrawer = uiHook.useSetBottomDrawer()

  const onPressAdd = React.useCallback(() => {
    pushTokenSearch(componentId)
  }, [])

  const onPressMoreFactory: IItemProps['onPressMoreFactory'] = React.useCallback(
    t => () => {
      setBottomDrawer({
        payload: { token: t },
        type: uiType.BottomDrawerType.TokenOptions
      })
    },
    []
  )

  return (
    <Padding>
      <Card>
        <Card.Title title='TOKEN' />
        {tokens.length === 0 ? (
          <Message>
            <Caption>No Token</Caption>
          </Message>
        ) : (
          <FlatList
            data={tokens}
            keyExtractor={item => item.address}
            renderItem={({ item }) => (
              <Item item={item} onPressMoreFactory={onPressMoreFactory} />
            )}
          />
        )}
        <Card.Actions>
          <Expanded.View>
            <Button onPress={onPressAdd} mode='text'>
              add token
            </Button>
          </Expanded.View>
        </Card.Actions>
      </Card>
    </Padding>
  )
}

const Message = styled.View`
  height: 120;
  align-items: center;
  justify-content: center;
`
