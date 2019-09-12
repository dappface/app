import {Currency, Network, SearchEngine} from 'src/const'
import {ActionType} from 'src/redux/module/setting/action-type'
import * as settingType from 'src/redux/module/setting/type'

export const setCurrency = (currency: Currency): settingType.ISetCurrency => ({
  payload: {currency},
  type: ActionType.SET_CURRENCY,
})

export const setNetwork = (network: Network): settingType.ISetNetwork => ({
  payload: {network},
  type: ActionType.SET_NETWORK,
})

export const setSearchEngine = (
  searchEngine: SearchEngine,
): settingType.ISetSearchEngine => ({
  payload: {searchEngine},
  type: ActionType.SET_SEARCH_ENGINE,
})
