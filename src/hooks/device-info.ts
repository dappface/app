import {useEffect, useState} from 'react'
import DeviceInfo from 'react-native-device-info'

const bezeLesslModels = ['iPhone X', 'iPhone Xʀ']

export function useHasBezel(): boolean {
  const [hasBezel, setHasBezel] = useState(true)

  useEffect(() => {
    ;(async () => {
      const model = await DeviceInfo.getModel()
      const result = !bezeLesslModels.includes(model)
      setHasBezel(result)
    })()
  })

  return hasBezel
}
