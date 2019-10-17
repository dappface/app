import {useEffect, useState} from 'react'
import DeviceInfo from 'react-native-device-info'

const bezeLesslModels = ['iPhone X', 'iPhone Xʀ', 'iPhone 11', 'iPhone 11 Pro']

export function useHasBezel(): boolean {
  const [hasBezel, setHasBezel] = useState(false)

  useEffect(() => {
    ;(async () => {
      const model = await DeviceInfo.getModel()
      const result = !bezeLesslModels.includes(model)
      setHasBezel(result)
    })()
  }, [])

  return hasBezel
}
