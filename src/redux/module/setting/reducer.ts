import {Currency, Network, SearchEngine} from 'src/const'
import {ActionType} from 'src/redux/module/setting/action-type'
import {Actions, IState} from 'src/redux/module/setting/type'

export const initialState: IState = {
  currency: Currency.USD,
  network: Network.Rinkeby,
  searchEngine: SearchEngine.Google,
}

export function reducer(state: IState = initialState, action: Actions): IState {
  switch (action.type) {
    case ActionType.SET_CURRENCY:
      return {...state, currency: action.payload.currency}
    case ActionType.SET_NETWORK:
      return {...state, network: action.payload.network}
    case ActionType.SET_SEARCH_ENGINE:
      return {...state, searchEngine: action.payload.searchEngine}
    default:
      return state
  }
}
