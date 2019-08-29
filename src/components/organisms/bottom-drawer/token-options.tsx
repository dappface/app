import * as React from 'react'
import { useMappedState } from 'redux-react-hook'
import { List } from 'src/components/organisms/bottom-drawer/list'
import { Option } from 'src/components/organisms/bottom-drawer/option'
import { IState } from 'src/redux/module'
import { tokenHook } from 'src/redux/module/token'
import { uiHook, uiSelector } from 'src/redux/module/ui'

export const TokenOptions = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      bottomDrawer: uiSelector.getBottomDrawer(state)
    }),
    []
  )
  const { bottomDrawer } = useMappedState(mapState)
  const setBottomDrawer = uiHook.useSetBottomDrawer()
  const { removeToken } = tokenHook.useTokenManager()

  const onClose = React.useCallback(() => {
    setBottomDrawer()
  }, [])

  const onPressRemove = React.useCallback(() => {
    if (!bottomDrawer) {
      return
    }
    removeToken(bottomDrawer.payload.token)
    setBottomDrawer()
  }, [bottomDrawer])

  return (
    <List onClose={onClose}>
      <Option title='Remove' iconName='ios-trash' onPress={onPressRemove} />
    </List>
  )
}
