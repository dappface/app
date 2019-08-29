import firebase from 'react-native-firebase'
import Reactotron from 'reactotron-react-native'

export const init = async () => {
  try {
    const credential = await firebase.auth().signInAnonymously()
    if (credential) {
      Reactotron.log('default app user ->', credential.user.toJSON())
    }
  } catch (err) {
    Reactotron.error(`Failed to initailize Firebase: ${err}`)
  }
}
