import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import {ScreenName} from 'src/const'
import {Wallet} from '../screens'
import {defaultScreenOptions} from './shared'

export function WalletImportStackNavigation() {
  return (
    <WalletImportStack.Navigator
      initialRouteName={ScreenName.WalletImport}
      screenOptions={defaultScreenOptions}>
      <WalletImportStack.Screen
        name={ScreenName.WalletImport}
        component={Wallet.Import}
      />

      <WalletImportStack.Screen
        name={ScreenName.WalletImportAccountSelector}
        component={Wallet.AccountSelector}
      />
    </WalletImportStack.Navigator>
  )
}

const WalletImportStack = createStackNavigator()
