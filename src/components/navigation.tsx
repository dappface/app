import {NavigationNativeContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import {Color, ScreenName} from 'src/const'
import {BrowserScreen, Settings} from './screens'

export function Navigation() {
  return (
    <NavigationNativeContainer>
      <RootStack.Navigator
        initialRouteName={ScreenName.BrowserScreen}
        mode='modal'
        screenOptions={{
          ...DEFAULT_SCREEN_OPTIONS,
          header: null,
        }}>
        <RootStack.Screen
          name={ScreenName.BrowserScreen}
          component={BrowserScreen}
        />

        <RootStack.Screen
          name={ScreenName.SettingsStackScreen}
          component={SettingsStackScreen}
        />
      </RootStack.Navigator>
    </NavigationNativeContainer>
  )
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      initialRouteName={ScreenName.SettingsScreen}
      screenOptions={DEFAULT_SCREEN_OPTIONS}>
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
    </SettingsStack.Navigator>
  )
}

const RootStack = createStackNavigator()
const SettingsStack = createStackNavigator()
const DEFAULT_SCREEN_OPTIONS = {
  cardStyle: {backgroundColor: Color.WHITE},
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
  },
  headerBackTitleVisible: false,
  headerTintColor: Color.SECONDARY,
}

// export const initNavigation = async (): Promise<void> => {
//   const backButtonIcon = await Ionicons.getImageSource('md-arrow-back', 24)

//   Navigation.events().registerAppLaunchedListener(() => {
//     Navigation.setDefaultOptions({
//       topBar: {
//         backButton: {
//           color: Color.TEXT.BLACK_HIGH_EMPHASIS,
//           icon: backButtonIcon,
//           title: '',
//         },
//         background: {
//           color: Color.WHITE,
//         },
//         drawBehind: false,
//         noBorder: true,
//         title: {
//           fontFamily: 'Roboto-Regular',
//           fontSize: 20,
//         },
//       },
//     })
//     goToBrowser()
//   })
// }

// // Roots
// export const goToBrowser = (): void => {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: Screen.BROWSER,
//               options: {
//                 topBar: {
//                   visible: false,
//                 },
//               },
//             },
//           },
//         ],
//       },
//     },
//   })
// }

// // Modals
// export const showImportAccounts = async (): Promise<void> => {
//   const cancelIcon = await Ionicons.getImageSource('md-close', 24)
//   Navigation.showModal({
//     stack: {
//       children: [
//         {
//           component: {
//             name: Screen.WALLET.IMPORT.BASE,
//             options: {
//               topBar: {
//                 leftButtons: [
//                   {
//                     icon: cancelIcon,
//                     id: NavigationEvent.CancelImport,
//                   },
//                 ],
//                 title: {
//                   text: 'Import Accounts',
//                 },
//               },
//             },
//           },
//         },
//       ],
//     },
//   })
// }

// export const showLinks = (): void => {
//   Navigation.showModal({
//     stack: {
//       children: [
//         {
//           component: {
//             name: Screen.LINKS,
//             options: {
//               topBar: {
//                 title: {
//                   text: 'Links',
//                 },
//               },
//             },
//           },
//         },
//       ],
//     },
//   })
// }

// export const showSettings = (): void => {
//   Navigation.showModal({
//     stack: {
//       children: [
//         {
//           component: {
//             name: Screen.SETTINGS.BASE,
//             options: {
//               topBar: {
//                 title: {
//                   text: 'Settings',
//                 },
//               },
//             },
//           },
//         },
//       ],
//     },
//   })
// }

// export const showWalletScan = (props: {setTo: (to: string) => void}): void => {
//   Navigation.showModal({
//     component: {
//       name: Screen.WALLET.SCAN,
//       passProps: props,
//     },
//   })
// }

// export const showBackup = (): void => {
//   Navigation.showModal({
//     stack: {
//       children: [
//         {
//           component: {
//             name: Screen.SETTINGS.BACKUP.BASE,
//             options: {
//               topBar: {
//                 title: {
//                   text: 'Backup',
//                 },
//               },
//             },
//             passProps: {
//               isModal: true,
//             },
//           },
//         },
//       ],
//     },
//   })
// }

// // Stacks
// export const pushAccountSelector = (
//   componentId: string,
//   props: {mnemonic: string},
// ): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.WALLET.IMPORT.ACCOUNT_SELECTOR,
//       options: {
//         topBar: {
//           title: {
//             text: 'Choose Accounts',
//           },
//         },
//       },
//       passProps: props,
//     },
//   })
// }

// export const pushBackup = (componentId: string): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.SETTINGS.BACKUP.BASE,
//       options: {
//         topBar: {
//           title: {
//             text: 'Backup',
//           },
//         },
//       },
//     },
//   })
// }

// export const pushQuiz = (
//   componentId: string,
//   props: {[key: string]: any},
// ): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.SETTINGS.BACKUP.QUIZ,
//       options: {
//         topBar: {
//           title: {
//             text: 'Quiz',
//           },
//         },
//       },
//       passProps: props,
//     },
//   })
// }

// export const pushCurrencySetting = (componentId: string): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.SETTINGS.CURRENCY,
//       options: {
//         topBar: {
//           title: {
//             text: 'Currency',
//           },
//         },
//       },
//     },
//   })
// }

// export const pushNetworkSetting = (componentId: string): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.SETTINGS.NETWORK,
//       options: {
//         topBar: {
//           title: {
//             text: 'Network',
//           },
//         },
//       },
//     },
//   })
// }

// export const pushReceive = (componentId: string): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.WALLET.RECEIVE,
//       options: {
//         topBar: {
//           title: {
//             text: 'Receive',
//           },
//         },
//       },
//     },
//   })
// }

// export const pushSearchEngineSetting = (componentId: string): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.SETTINGS.SEARCH_ENGINE,
//       options: {
//         topBar: {
//           title: {
//             text: 'Search Engine',
//           },
//         },
//       },
//     },
//   })
// }

// export const pushSend = (componentId: string): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.WALLET.SEND,
//       options: {
//         topBar: {
//           title: {
//             text: 'Send',
//           },
//         },
//       },
//     },
//   })
// }

// export const pushTokenSearch = (componentId: string): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.WALLET.TOKEN_SEARCH,
//       options: {
//         topBar: {
//           title: {
//             text: 'Search Tokens',
//           },
//         },
//       },
//     },
//   })
// }

// export const pushComfirmSend = (
//   componentId: string,
//   props: {txParams: accountType.ITransactionParams},
// ): void => {
//   Navigation.push(componentId, {
//     component: {
//       name: Screen.WALLET.CONFIRM,
//       options: {
//         topBar: {
//           title: {
//             text: 'Confirm',
//           },
//         },
//       },
//       passProps: props,
//     },
//   })
// }
