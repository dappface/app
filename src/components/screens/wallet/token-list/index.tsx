import React, {useCallback} from 'react'
import {FlatList} from 'react-native'
import {Button, Caption, Card} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {Expanded, Padding} from 'src/components/atoms'
import {
  IProps as IItemProps,
  Item,
} from 'src/components/screens/wallet/token-list/item'
import {tokenSelector} from 'src/redux/module/token'
import {uiHook, uiType} from 'src/redux/module/ui'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
}

export function TokenList({componentId}: IProps) {
  const tokens = useSelector(tokenSelector.getCurrentAccountTokens)
  const setBottomDrawer = uiHook.useSetBottomDrawer()

  const onPressAdd = useCallback(() => {
    pushTokenSearch(componentId)
  }, [componentId])

  const onPressMoreFactory: IItemProps['onPressMoreFactory'] = useCallback(
    t => () => {
      setBottomDrawer({
        payload: {token: t},
        type: uiType.BottomDrawerType.TokenOptions,
      })
    },
    [setBottomDrawer],
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
            renderItem={({item}) => (
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
