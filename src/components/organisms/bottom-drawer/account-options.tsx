import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {List} from 'src/components/organisms/bottom-drawer/list'
import {Option} from 'src/components/organisms/bottom-drawer/option'
import {accountHook, accountSelector} from 'src/redux/module/account'
import {uiHook} from 'src/redux/module/ui'

export function AccountOptions() {
  const isDefault = useSelector(accountSelector.getIsCurrentAccountDefault)
  const setBottomDrawer = uiHook.useSetBottomDrawer()
  const {setCurrentAccountAsDefault} = accountHook.useAccountManager()

  const onClose = useCallback(() => {
    setBottomDrawer()
  }, [setBottomDrawer])

  const onPressDefault = useCallback(() => {
    setCurrentAccountAsDefault()
    setBottomDrawer()
  }, [setBottomDrawer, setCurrentAccountAsDefault])

  return (
    <List onClose={onClose}>
      <Option
        title='Set as default'
        iconName={isDefault ? 'ios-star' : 'ios-star-outline'}
        onPress={onPressDefault}
        disabled={isDefault}
      />
    </List>
  )
}
