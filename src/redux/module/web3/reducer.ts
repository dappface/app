import {ActionType} from 'src/redux/module/web3/action-type'
import {Actions, IState} from 'src/redux/module/web3/type'

export const initialState: IState = {
  latestBlockNumber: 0,
}

export function reducer(state: IState = initialState, action: Actions): IState {
  switch (action.type) {
    case ActionType.SET_LATEST_BLOCK_NUMBER:
      return {...state, latestBlockNumber: action.payload.latestBlockNumber}
    default:
      return state
  }
}
