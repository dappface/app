import Reactotron, {openInEditor} from 'reactotron-react-native'
import {reactotronRedux} from 'reactotron-redux'

Reactotron.configure({name: 'DappFace'})
  .useReactNative()
  .use(openInEditor())
  .use(reactotronRedux())

if (__DEV__) {
  Reactotron.connect()
}
