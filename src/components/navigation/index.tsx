import {NavigationNativeContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import {ScreenName} from 'src/const'
import {BrowserScreen, Wallet} from '../screens'
import {LinksTabNavigation} from './links'
import {
  SettingsStackNavigation,
  SettingsBackupStackNavigation,
} from './settings'
import {defaultScreenOptions} from './shared'
import {WalletImportStackNavigation, WalletSendStackNavigation} from './wallet'

export function Navigation() {
  return (
    <NavigationNativeContainer>
      <RootStack.Navigator
        initialRouteName={ScreenName.BrowserScreen}
        mode='modal'
        screenOptions={{
          ...defaultScreenOptions,
          header: null,
        }}>
        <RootStack.Screen
          name={ScreenName.BrowserScreen}
          component={BrowserScreen}
        />

        <RootStack.Screen
          name={ScreenName.WalletImportStackNavigation}
          component={WalletImportStackNavigation}
        />

        <RootStack.Screen
          name={ScreenName.SettingsBackupStackNavigation}
          component={SettingsBackupStackNavigation}
        />

        <RootStack.Screen
          name={ScreenName.WalletReceiveScreen}
          component={Wallet.ReceiveScreen}
          options={({navigation}) => ({
            header: navigation.header,
            headerLeft: () => null,
          })}
        />

        <RootStack.Screen
          name={ScreenName.WalletSendStackNavigation}
          component={WalletSendStackNavigation}
        />

        <RootStack.Screen
          name={ScreenName.WalletTokenSearchScreen}
          component={Wallet.TokenSearchScreen}
          options={({navigation}) => ({header: navigation.header})}
        />

        <RootStack.Screen
          name={ScreenName.LinksTabNavigation}
          component={LinksTabNavigation}
          options={({navigation}) => ({
            header: navigation.header,
            headerLeft: () => null,
          })}
        />

        <RootStack.Screen
          name={ScreenName.SettingsStackNavigation}
          component={SettingsStackNavigation}
        />
      </RootStack.Navigator>
    </NavigationNativeContainer>
  )
}

const RootStack = createStackNavigator()
