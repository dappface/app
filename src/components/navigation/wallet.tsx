import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import {ScreenName} from 'src/const'
import {Wallet} from '../screens'
import {defaultScreenOptions} from './shared'

export function WalletImportStackNavigation() {
  return (
    <WalletImportStack.Navigator
      initialRouteName={ScreenName.WalletImportScreen}
      screenOptions={defaultScreenOptions}>
      <WalletImportStack.Screen
        name={ScreenName.WalletImportScreen}
        component={Wallet.Import}
      />

      <WalletImportStack.Screen
        name={ScreenName.WalletImportAccountSelectorScreen}
        component={Wallet.AccountSelector}
      />
    </WalletImportStack.Navigator>
  )
}

export function WalletSendStackNavigation() {
  return (
    <WalletSendStack.Navigator
      initialRouteName={ScreenName.WalletSendScreen}
      screenOptions={defaultScreenOptions}>
      <WalletSendStack.Screen
        name={ScreenName.WalletSendScreen}
        component={Wallet.Send}
      />
      <WalletSendStack.Screen
        name={ScreenName.WalletScanScreen}
        component={Wallet.Scan}
        options={{header: null}}
      />
      <WalletSendStack.Screen
        name={ScreenName.WalletSendConfirmScreen}
        component={Wallet.Confirm}
      />
    </WalletSendStack.Navigator>
  )
}

const WalletImportStack = createStackNavigator()
const WalletSendStack = createStackNavigator()
