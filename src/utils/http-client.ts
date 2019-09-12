import axios from 'axios'
import DeviceInfo from 'react-native-device-info'

export const httpClient = axios.create({
  headers: {
    'User-Agent': DeviceInfo.getUserAgent(),
  },
  timeout: 30000,
})
