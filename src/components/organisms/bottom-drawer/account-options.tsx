import * as React from 'react'
import {useMappedState} from 'redux-react-hook'
import {List} from 'src/components/organisms/bottom-drawer/list'
import {Option} from 'src/components/organisms/bottom-drawer/option'
import {IState} from 'src/redux/module'
import {accountHook, accountSelector} from 'src/redux/module/account'
import {uiHook} from 'src/redux/module/ui'

export const AccountOptions = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      isDefault: accountSelector.getIsCurrentAccountDefault(state),
    }),
    [],
  )
  const {isDefault} = useMappedState(mapState)
  const setBottomDrawer = uiHook.useSetBottomDrawer()
  const {setCurrentAccountAsDefault} = accountHook.useAccountManager()

  const onClose = React.useCallback(() => {
    setBottomDrawer()
  }, [setBottomDrawer])

  const onPressDefault = React.useCallback(() => {
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
