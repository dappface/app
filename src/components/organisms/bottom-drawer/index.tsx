import React from 'react'
import {useSelector} from 'react-redux'
import {AccountOptions} from 'src/components/organisms/bottom-drawer/account-options'
import {BrowserOptions} from 'src/components/organisms/bottom-drawer/browser-options'
import {TokenOptions} from 'src/components/organisms/bottom-drawer/token-options'
import {uiSelector, uiType} from 'src/redux/module/ui'

export function BottomDrawer() {
  const bottomDrawer = useSelector(uiSelector.getBottomDrawer)

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
