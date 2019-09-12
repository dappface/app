import {Url} from 'src/const'
import {httpClient} from './http-client'

export const getGasInfo = async () => {
  const {data} = await httpClient.get(Url.GAS_STATION)
  return data
}
