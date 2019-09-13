import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {List} from 'src/components/organisms/bottom-drawer/list'
import {Option} from 'src/components/organisms/bottom-drawer/option'
import {tokenHook} from 'src/redux/module/token'
import {uiHook, uiSelector} from 'src/redux/module/ui'

export function TokenOptions() {
  const bottomDrawer = useSelector(uiSelector.getBottomDrawer)
  const setBottomDrawer = uiHook.useSetBottomDrawer()
  const {removeToken} = tokenHook.useTokenManager()

  const onClose = useCallback(() => {
    setBottomDrawer()
  }, [setBottomDrawer])

  const onPressRemove = useCallback(() => {
    if (!bottomDrawer) {
      return
    }
    removeToken(bottomDrawer.payload.token)
    setBottomDrawer()
  }, [bottomDrawer, removeToken, setBottomDrawer])

  return (
    <List onClose={onClose}>
      <Option title='Remove' iconName='ios-trash' onPress={onPressRemove} />
    </List>
  )
}
