import {ApolloProvider} from '@apollo/react-hooks'
import React, {Suspense, useEffect, useState} from 'react'
import {View} from 'react-native'
import Orientation from 'react-native-orientation'
import {Provider as PaperProvider} from 'react-native-paper'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {client, initApolloClient} from 'src/apollo'
import {PaperTheme} from 'src/const'
import {configureStore, persistor, store} from 'src/redux/store'

interface IProps {
  children: JSX.Element[] | JSX.Element
}

export function LibraryProvider({children}: IProps) {
  const isInitialized = useInitializeLibraries()
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

function useInitializeLibraries(): boolean {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    ;(async () => {
      Orientation.lockToPortrait()
      await configureStore()
      initApolloClient()
      setIsInitialized(true)
    })()
  }, [])

  return isInitialized
}

function Error() {
  return <View />
}
