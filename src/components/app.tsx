import {ApolloProvider} from '@apollo/react-hooks'
import React, {Suspense, useEffect, useState} from 'react'
import {View} from 'react-native'
import {createAppContainer} from 'react-navigation'
import Orientation from 'react-native-orientation'
import {Provider as PaperProvider} from 'react-native-paper'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {client, initClient} from 'src/apollo'
import {Snackbar} from 'src/components/atoms'
import {PaperTheme} from 'src/const'
import {
  BottomAppBarManagerContext,
  BrowserManagerContext,
  useInitializedBottomAppBarManager,
  useInitializedBrowserManager,
  useInitializedWeb3,
  Web3Context,
} from 'src/hooks'
import {configureStore, persistor, store} from 'src/redux/store'
import {init as initFirebase} from 'src/utils/firebase'
import {createAppNavigator} from './navigation'

const appNavigator = createAppNavigator()
const AppContainer = createAppContainer(appNavigator)

export function App() {
  return (
    <LibraryProviders>
      <AppProviders>
        <AppContainer />
      </AppProviders>
    </LibraryProviders>
  )
}

interface IProviderProps {
  children: JSX.Element[] | JSX.Element
}

function LibraryProviders({children}: IProviderProps) {
  const isInitialized = useInit()
  if (!isInitialized) {
    return null
  }

  return (
    <Suspense fallback={<Error />}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PaperProvider theme={PaperTheme}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </PaperProvider>
        </Provider>
      </ApolloProvider>
    </Suspense>
  )
}

function useInit(): boolean {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    ;(async () => {
      Orientation.lockToPortrait()
      await initFirebase()
      await configureStore()
      initClient()
      setIsInitialized(true)
    })()
  }, [])

  return isInitialized
}

function AppProviders({children}: IProviderProps) {
  const initializedBrowserManager = useInitializedBrowserManager()
  const initializedBottomAppBarManager = useInitializedBottomAppBarManager()
  const initializedWeb3 = useInitializedWeb3()

  if (!initializedWeb3) {
    return null
  }

  return (
    <Web3Context.Provider value={initializedWeb3}>
      <BrowserManagerContext.Provider value={initializedBrowserManager}>
        <BottomAppBarManagerContext.Provider
          value={initializedBottomAppBarManager}>
          {children}
          <Snackbar />
        </BottomAppBarManagerContext.Provider>
      </BrowserManagerContext.Provider>
    </Web3Context.Provider>
  )
}

function Error() {
  return <View />
}
