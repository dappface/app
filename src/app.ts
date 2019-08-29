import Orientation from 'react-native-orientation'
import { initClient } from 'src/apollo'
import { registerScreens } from 'src/components/screens'
import { initNavigation } from 'src/navigation'
import { configureStore } from 'src/redux/store'
import { init as initFirebase } from 'src/utils/firebase'

export const app = async (): Promise<void> => {
  await initFirebase()
  initClient()
  await configureStore()
  registerScreens()
  await initNavigation()
  Orientation.lockToPortrait()
}
