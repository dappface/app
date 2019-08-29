import DeviceInfo from 'react-native-device-info'

const IPHONE_X = 'iPhone X'
const IPHONE_XR = 'iPhone XR'
const bezelModels = [IPHONE_X, IPHONE_XR]

export const hasBezel = () =>
  // @ts-ignore
  bezelModels.includes(DeviceInfo.getModel())
