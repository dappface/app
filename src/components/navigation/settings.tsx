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
        name={ScreenName.SettingsBackupScreen}
        component={Settings.BackupScreen}
      />

      <SettingsStack.Screen
        name={ScreenName.SettingsBackupQuizScreen}
        component={Settings.QuizScreen}
      />
    </SettingsStack.Navigator>
  )
}

const SettingsStack = createStackNavigator()
