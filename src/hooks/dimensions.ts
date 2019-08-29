import * as React from 'react'
import { Dimensions, ScaledSize } from 'react-native'

export const useDimensions = () => {
  const [dimensions, setDimensions] = React.useState({
    screen: Dimensions.get('window'),
    window: Dimensions.get('screen')
  })

  const onChange = ({ window, screen }: IDimensions) => {
    setDimensions({ window, screen })
  }

  React.useEffect(() => {
    Dimensions.addEventListener('change', onChange)

    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  return dimensions
}

export interface IDimensions {
  screen: ScaledSize
  window: ScaledSize
}
