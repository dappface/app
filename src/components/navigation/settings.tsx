import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import {ScreenName} from 'src/const'
import {Settings} from '../screens'
import {defaultScreenOptions} from './shared'

export function SettingsStackNavigation() {
  return (
    <SettingsStack.Navigator
      initialRouteName={ScreenName.SettingsScreen}
      screenOptions={defaultScreenOptions}>
      <SettingsStack.Screen
        name={ScreenName.SettingsScreen}
        component={Settings.SettingsScreen}
      />

      <SettingsStack.Screen
        name={ScreenName.SettingsNetworkScreen}
        component={Settings.NetworkScreen}
      />

      <SettingsStack.Screen
        name={ScreenName.SettingsCurrencyScreen}
        component={Settings.CurrencyScreen}
      />

      <SettingsStack.Screen
        name={ScreenName.SettingsSearchEngineScreen}
        component={Settings.SearchEngineScreen}
      />

      <SettingsStack.Screen
        name={ScreenName.SettingsBackupStackNavigation}
        component={SettingsBackupStackNavigation}
        options={{header: null}}
      />
    </SettingsStack.Navigator>
  )
}

export function SettingsBackupStackNavigation() {
  return (
    <SettingsBackupStack.Navigator
      initialRouteName={ScreenName.SettingsBackupScreen}
      screenOptions={defaultScreenOptions}>
      <SettingsBackupStack.Screen
        name={ScreenName.SettingsBackupScreen}
        component={Settings.BackupScreen}
      />
      <SettingsBackupStack.Screen
        name={ScreenName.SettingsBackupQuizScreen}
        component={Settings.QuizScreen}
      />
    </SettingsBackupStack.Navigator>
  )
}

const SettingsStack = createStackNavigator()
const SettingsBackupStack = createStackNavigator()
