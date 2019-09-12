import {Currency, Network, SearchEngine} from 'src/const'
import {ActionType} from 'src/redux/module/setting/action-type'

export interface IState {
  currency: Currency
  network: Network
  searchEngine: SearchEngine
}

export type Actions = ISetCurrency | ISetNetwork | ISetSearchEngine

export interface ISetCurrency {
  payload: {currency: Currency}
  type: ActionType.SET_CURRENCY
}

export interface ISetNetwork {
  payload: {network: Network}
  type: ActionType.SET_NETWORK
}

export interface ISetSearchEngine {
  payload: {searchEngine: SearchEngine}
  type: ActionType.SET_SEARCH_ENGINE
}

export interface ISettingManager {
  setCurrency: (currency: Currency) => void
  setNetwork: (network: Network) => void
  setSearchEngine: (searchEngine: SearchEngine) => void
}
