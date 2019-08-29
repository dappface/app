import { ActionType } from 'src/redux/module/web3/action-type'
import * as web3Type from 'src/redux/module/web3/type'

export const setLatestBlockNumber = (
  latestBlockNumber: number
): web3Type.ISetLatestBlockNumber => ({
  payload: { latestBlockNumber },
  type: ActionType.SET_LATEST_BLOCK_NUMBER
})
