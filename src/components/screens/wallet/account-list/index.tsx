import * as React from 'react'
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import {useMappedState} from 'redux-react-hook'
import {Item} from 'src/components/screens/wallet/account-list/item'
import {Size} from 'src/const'
import {useDimensions} from 'src/hooks'
import {pushReceive, pushSend, showBackup} from 'src/navigation'
import {IState} from 'src/redux/module'
import {accountHook, accountSelector} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {uiHook, uiType} from 'src/redux/module/ui'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
}

export const AccountList = ({componentId}: IProps) => {
  const listRef = React.useRef<FlatList<entityType.IAccount> | null>(null)

  const {
    window: {width},
  } = useDimensions()
  const mapState = React.useCallback(
    (state: IState) => ({
      accounts: accountSelector.getAccounts(state),
      currentAccountIndex: accountSelector.getCurrentAccountIndex(state),
      isBackedUp: accountSelector.getIsBackedUp(state),
    }),
    [],
  )
  const {accounts, currentAccountIndex, isBackedUp} = useMappedState(mapState)
  const {setCurrentAccountAddressByIndex} = accountHook.useAccountManager()
  const setBottomDrawer = uiHook.useSetBottomDrawer()

  const onPressBackup = React.useCallback(() => {
    showBackup()
  }, [])

  const onPressOption = React.useCallback(() => {
    setBottomDrawer({
      type: uiType.BottomDrawerType.AccountOptions,
    })
  }, [setBottomDrawer])

  const onPressReceive = React.useCallback(() => {
    pushReceive(componentId)
  }, [componentId])

  const onPressSend = React.useCallback(() => {
    pushSend(componentId)
  }, [componentId])

  const onMomentumScrollEnd = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x
      const newIndex = offsetX / width
      if (newIndex % 1 !== 0) {
        return
      }
      setCurrentAccountAddressByIndex(newIndex)
    },
    [setCurrentAccountAddressByIndex, width],
  )

  const getItemLayout = React.useCallback(
    (
      _: any,
      index: number,
    ): {length: number; offset: number; index: number} => ({
      index,
      length: width,
      offset: width * index,
    }),
    [width],
  )

  React.useEffect(() => {
    setCurrentAccountAddressByIndex(0)
  }, [setCurrentAccountAddressByIndex])

  React.useEffect(() => {
    if (currentAccountIndex < 0 || !listRef.current) {
      return
    }

    listRef.current.scrollToIndex({index: currentAccountIndex})
  }, [currentAccountIndex])

  return (
    <Container>
      <FlatList
        data={accounts}
        keyExtractor={item => item.address}
        extraData={[currentAccountIndex, isBackedUp]}
        getItemLayout={getItemLayout}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
        ref={listRef}
        horizontal
        renderItem={({item}) => (
          <Item
            item={item}
            onPressBackup={onPressBackup}
            onPressOption={onPressOption}
            onPressReceive={onPressReceive}
            onPressSend={onPressSend}
          />
        )}
      />
    </Container>
  )
}

const Container = styled.View`
  margin-bottom: ${Size.MARGIN_16};
`
