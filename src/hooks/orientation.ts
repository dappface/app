import * as React from 'react'
import Orientation from 'react-native-orientation'

export const useOrientation = () => {
  const [orientation, setOrientation] = React.useState(
    Orientation.getInitialOrientation(),
  )

  const orientationListener = (o: Orientation.orientation) => {
    setOrientation(o)
  }

  React.useEffect(() => {
    Orientation.addOrientationListener(orientationListener)
    return () => {
      Orientation.removeOrientationListener(orientationListener)
    }
  }, [])

  return orientation
}
