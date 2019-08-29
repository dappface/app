import base64 from 'base64-js'
import RNFS from 'react-native-fs'
import * as Keychain from 'react-native-keychain'
import { generateSecureRandom } from 'react-native-securerandom'
import Reactotron from 'reactotron-react-native'
import { compose, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import createEncryptor from 'redux-persist-transform-encrypt'
import { configurePersistedReducer } from 'src/redux/reducer'

export let store: any
export let persistor: any

const REDUX_PERSIST = 'reduxPersist'

export async function configureStore(): Promise<void> {
  Reactotron.log(`Document dir path: ${RNFS.DocumentDirectoryPath}`)
  const secretKey = await getSecretKey()
  const encryptor = createEncryptor({
    onError: e => {
      Reactotron.error('Faield to init incryptor: ', e)
    },
    secretKey
  })

  const persistedReducer = configurePersistedReducer(encryptor)

  if (__DEV__) {
    const composeEnhancers =
      // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    store = createStore(
      persistedReducer,
      composeEnhancers(Reactotron.createEnhancer())
    )
  } else {
    store = createStore(persistedReducer)
  }
  persistor = persistStore(store)
}

async function getSecretKey(): Promise<string> {
  const creds = await Keychain.getGenericPassword({ service: REDUX_PERSIST })
  if (!creds) {
    const byteKey = await generateSecureRandom(64)
    const stringKey = base64.fromByteArray(byteKey)
    await Keychain.setGenericPassword(REDUX_PERSIST, stringKey, {
      service: REDUX_PERSIST
    })
    return stringKey
  }

  if (
    typeof creds === 'object' &&
    creds.username === REDUX_PERSIST &&
    creds.service === REDUX_PERSIST
  ) {
    return creds.password
  }

  throw new Error(
    'Failed to get or set encryption key for apollo-cache-persistor'
  )
}
