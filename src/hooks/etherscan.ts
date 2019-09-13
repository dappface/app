import axios, {AxiosResponse} from 'axios'
import {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {ETHERSCAN_API_KEY} from 'react-native-dotenv'
import {entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'

export function useFetchTransactions(): FetchTransitions {
  const etherscanApiUrl = useSelector(settingSelector.getEtherscanApiUrl)

  return useCallback(
    (a: entityType.IAccount) =>
      axios.get(etherscanApiUrl, {
        params: {
          action: Action.TxList,
          address: a.address,
          apikey: ETHERSCAN_API_KEY,
          module: Module.Account,
          sort: Sort.Desc,
        },
      }),
    [etherscanApiUrl],
  )
}

type FetchTransitions = (
  account: entityType.IAccount,
) => Promise<AxiosResponse<any>>

enum Module {
  Account = 'account',
}

enum Action {
  TxList = 'txlist',
}

enum Sort {
  Asc = 'asc',
  Desc = 'desc',
}
