import * as React from 'react'
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import Orientation from 'react-native-orientation'
import {Provider as PaperProvider} from 'react-native-paper'
import {PersistGate} from 'redux-persist/integration/react'
import {StoreContext} from 'redux-react-hook'
import {client} from 'src/apollo'
import {Snackbar} from 'src/components/atoms'
import {Browser} from 'src/components/screens/browser'
import {Links} from 'src/components/screens/links'
import * as Settings from 'src/components/screens/settings'
import * as Wallet from 'src/components/screens/wallet'
import {PaperTheme, Screen} from 'src/const'
import {
  BottomAppBarManagerContext,
  BrowserManagerContext,
  useInitializedBottomAppBarManager,
  useInitializedBrowserManager,
  useInitializedWeb3,
  Web3Context,
} from 'src/hooks'
import {persistor, store} from 'src/redux/store'

export function registerScreens() {
  Navigation.registerComponent(Screen.BROWSER, wrapWithProvider(Browser))
  Navigation.registerComponent(
    Screen.SETTINGS.BACKUP.BASE,
    wrapWithProvider(Settings.Backup),
  )
  Navigation.registerComponent(
    Screen.SETTINGS.BACKUP.QUIZ,
    wrapWithProvider(Settings.Quiz),
  )
  Navigation.registerComponent(
    Screen.SETTINGS.BASE,
    wrapWithProvider(Settings.Settings),
  )
  Navigation.registerComponent(
    Screen.SETTINGS.CURRENCY,
    wrapWithProvider(Settings.Currency),
  )
  Navigation.registerComponent(
    Screen.SETTINGS.NETWORK,
    wrapWithProvider(Settings.Network),
  )
  Navigation.registerComponent(
    Screen.SETTINGS.SEARCH_ENGINE,
    wrapWithProvider(Settings.SearchEngine),
  )
  Navigation.registerComponent(
    Screen.WALLET.TOKEN_SEARCH,
    wrapWithProvider(Wallet.TokenSearch),
  )
  Navigation.registerComponent(
    Screen.WALLET.CONFIRM,
    wrapWithProvider(Wallet.Confirm),
  )
  Navigation.registerComponent(
    Screen.WALLET.IMPORT.ACCOUNT_SELECTOR,
    wrapWithProvider(Wallet.AccountSelector),
  )
  Navigation.registerComponent(
    Screen.WALLET.IMPORT.BASE,
    wrapWithProvider(Wallet.Import),
  )
  Navigation.registerComponent(
    Screen.WALLET.RECEIVE,
    wrapWithProvider(Wallet.Receive),
  )
  Navigation.registerComponent(
    Screen.WALLET.SCAN,
    wrapWithProvider(Wallet.Scan),
  )
  Navigation.registerComponent(
    Screen.WALLET.SEND,
    wrapWithProvider(Wallet.Send),
  )
  Navigation.registerComponent(Screen.LINKS, wrapWithProvider(Links))
}

const Error = () => <View />

const wrapWithProvider = (Component: any, skipContext = false) => () => (
  props: any,
) => {
  useNavigationListenerEffect()

  return (
    <React.Suspense fallback={<Error />}>
      <ApolloHooksProvider client={client}>
        <StoreContext.Provider value={store}>
          <PaperProvider theme={PaperTheme}>
            <PersistGate loading={null} persistor={persistor}>
              {skipContext ? (
                <Component {...props} />
              ) : (
                <WithContext Component={Component} {...props} />
              )}
            </PersistGate>
          </PaperProvider>
        </StoreContext.Provider>
      </ApolloHooksProvider>
    </React.Suspense>
  )
}

function WithContext(props: any) {
  const initializedBrowserManager = useInitializedBrowserManager()
  const initializedBottomAppBarManager = useInitializedBottomAppBarManager()
  const initializedWeb3 = useInitializedWeb3()
  const {Component, ...newProps} = props

  if (!initializedWeb3) {
    return null
  }

  return (
    <Web3Context.Provider value={initializedWeb3}>
      <BrowserManagerContext.Provider value={initializedBrowserManager}>
        <BottomAppBarManagerContext.Provider
          value={initializedBottomAppBarManager}>
          <Component {...newProps} />
          <Snackbar />
        </BottomAppBarManagerContext.Provider>
      </BrowserManagerContext.Provider>
    </Web3Context.Provider>
  )
}

function useNavigationListenerEffect() {
  React.useEffect(() => {
    const didAppearListener = Navigation.events().registerComponentDidAppearListener(
      ({componentName}) => {
        if (componentName !== Screen.BROWSER) {
          return
        }
        Orientation.unlockAllOrientations()
      },
    )
    const didDisappearListener = Navigation.events().registerComponentDidDisappearListener(
      ({componentName}) => {
        if (componentName !== Screen.BROWSER) {
          return
        }
        Orientation.lockToPortrait()
      },
    )

    return () => {
      didAppearListener.remove()
      didDisappearListener.remove()
    }
  }, [])
}
