import React, {useCallback, useEffect, useRef} from 'react'
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import {useSelector} from 'react-redux'
import {Item} from 'src/components/screens/wallet/account-list/item'
import {Size} from 'src/const'
import {useDimensions} from 'src/hooks'
import {pushReceive, pushSend, showBackup} from 'src/navigation'
import {accountHook, accountSelector} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {uiHook, uiType} from 'src/redux/module/ui'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
}

export function AccountList({componentId}: IProps) {
  const listRef = useRef<FlatList<entityType.IAccount> | null>(null)

  const {
    window: {width},
  } = useDimensions()
  const accounts = useSelector(accountSelector.getAccounts)
  const currentAccountIndex = useSelector(
    accountSelector.getCurrentAccountIndex,
  )
  const isBackedUp = useSelector(accountSelector.getIsBackedUp)
  const {setCurrentAccountAddressByIndex} = accountHook.useAccountManager()
  const setBottomDrawer = uiHook.useSetBottomDrawer()

  const onPressBackup = useCallback(() => {
    showBackup()
  }, [])

  const onPressOption = useCallback(() => {
    setBottomDrawer({
      type: uiType.BottomDrawerType.AccountOptions,
    })
  }, [setBottomDrawer])

  const onPressReceive = useCallback(() => {
    pushReceive(componentId)
  }, [componentId])

  const onPressSend = useCallback(() => {
    pushSend(componentId)
  }, [componentId])

  const onMomentumScrollEnd = useCallback(
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

  const getItemLayout = useCallback(
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

  useEffect(() => {
    setCurrentAccountAddressByIndex(0)
  }, [setCurrentAccountAddressByIndex])

  useEffect(() => {
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
