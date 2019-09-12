import currencyFormatter from 'currency-formatter'
import {INFURA_PROJECT_ID} from 'react-native-dotenv'
import {createSelector} from 'reselect'
import {
  Currency,
  Network,
  Networks,
  SearchEngine,
  SearchEngines,
} from 'src/const'
import {IState as IAllState} from 'src/redux/module'

export const getCurrency = (state: IAllState): Currency =>
  state.setting.currency

export const getNetwork = (state: IAllState): Network => state.setting.network

export const getSearchEngine = (state: IAllState): SearchEngine =>
  state.setting.searchEngine

export const getCurrencyDetails = createSelector(
  getCurrency,
  (currency: Currency): currencyFormatter.Currency =>
    currencyFormatter.findCurrency(currency),
)

export const getRemoteNodeUrlFactory = (ws: boolean) =>
  createSelector(
    getNetwork,
    (network: Network): string => {
      const domain = Networks[network].remoteNodeUrl
      return ws
        ? `wss://${domain}/ws/v3/${INFURA_PROJECT_ID}`
        : `https://${domain}/v3/${INFURA_PROJECT_ID}`
    },
  )

export const getEtherscanApiUrl = createSelector(
  getNetwork,
  (network: Network): string => Networks[network].etherscanApiUrl,
)

export const getEtherscanUrl = createSelector(
  getNetwork,
  (network: Network): string => Networks[network].etherscanUrl,
)

export const getNetworkName = createSelector(
  getNetwork,
  (network: Network): string => Networks[network].name,
)

export const getSearchEngineName = createSelector(
  getSearchEngine,
  (searchEngine: SearchEngine): string => SearchEngines[searchEngine].name,
)
