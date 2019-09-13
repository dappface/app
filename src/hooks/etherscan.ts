import axios, {AxiosResponse} from 'axios'
import {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {ETHERSCAN_API_KEY} from 'react-native-dotenv'
import {entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'

export function useFetchTransactions(): FetchTransitions {
  const etherscanApiUrl = useSelector(settingSelector.getEtherscanApiUrl)

  return useCallback(
    a =>
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
) => Promise<AxiosResponse<Response>>

interface Response {
  status: string
  message: string
  result: Array<{
    blockNumber: string
    timeStamp: string
    hash: string
    nonce: string
    blockHash: string
    transactionIndex: string
    from: string
    to: string
    value: string
    gas: string
    gasPrice: string
    isError: string
    txreceipt_status: string
    input: string
    contractAddress: string
    cumulativeGasUsed: string
    gasUsed: string
    confirmations: string
  }>
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
