import axios from 'axios'
import * as React from 'react'
import {ETHERSCAN_API_KEY} from 'react-native-dotenv'
import {useMappedState} from 'redux-react-hook'
import {IState} from 'src/redux/module'
import {entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'

export const useFetchTransactions = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      etherscanApiUrl: settingSelector.getEtherscanApiUrl(state),
    }),
    [],
  )
  const {etherscanApiUrl} = useMappedState(mapState)

  return React.useCallback(
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
