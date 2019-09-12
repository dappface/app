import * as React from 'react'
import {useMappedState} from 'redux-react-hook'
import {AccountOptions} from 'src/components/organisms/bottom-drawer/account-options'
import {BrowserOptions} from 'src/components/organisms/bottom-drawer/browser-options'
import {TokenOptions} from 'src/components/organisms/bottom-drawer/token-options'
import {IState} from 'src/redux/module'
import {uiSelector, uiType} from 'src/redux/module/ui'

export const BottomDrawer = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      bottomDrawer: uiSelector.getBottomDrawer(state),
    }),
    [],
  )
  const {bottomDrawer} = useMappedState(mapState)

  if (!bottomDrawer) {
    return null
  }

  if (bottomDrawer.type === uiType.BottomDrawerType.AccountOptions) {
    return <AccountOptions />
  }

  if (bottomDrawer.type === uiType.BottomDrawerType.TokenOptions) {
    return <TokenOptions />
  }

  return <BrowserOptions />
}
