import {useEffect, useState} from 'react'
import DeviceInfo from 'react-native-device-info'

const bezelModels = ['iPhone X', 'iPhone Xʀ']

export function useHasBezel(): boolean {
  const [hasBezel, setHasBezel] = useState(true)

  useEffect(() => {
    ;(async () => {
      const model = await DeviceInfo.getModel()
      const result = bezelModels.includes(model)
      setHasBezel(result)
    })()
  })

  return hasBezel
}
