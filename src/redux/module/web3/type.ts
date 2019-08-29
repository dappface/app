import { ActionType } from 'src/redux/module/web3/action-type'

export interface IState {
  latestBlockNumber: number
}

export type Actions = ISetLatestBlockNumber

export interface ISetLatestBlockNumber {
  payload: { latestBlockNumber: number }
  type: ActionType.SET_LATEST_BLOCK_NUMBER
}
