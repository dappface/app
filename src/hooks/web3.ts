import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Reactotron from 'reactotron-react-native'
import * as rh from 'redux-react-hook'
import {IState} from 'src/redux/module'
import {accountHook, accountSelector} from 'src/redux/module/account'
import {settingSelector} from 'src/redux/module/setting'
import {tokenHook, tokenSelector} from 'src/redux/module/token'
import {web3Hook, web3Selector} from 'src/redux/module/web3'
import Web3 from 'web3'

export const useWeb3 = () => useContext(Web3Context) as Web3

export const Web3Context = createContext<Web3 | undefined>(undefined)

export const useInitializedWeb3 = (): Web3 | undefined => {
  const [connection, setConnection] = useState<ConnectionStatus | undefined>()
  const [web3, setWeb3] = useState<Web3>()
  const mapState = useCallback(
    (state: IState) => ({
      accounts: accountSelector.getAccounts(state),
      latestBlockNumber: web3Selector.getLatestBlockNumber(state),
      remoteNodeUrl: settingSelector.getRemoteNodeUrlFactory(true)(state),
      tokens: tokenSelector.getTokens(state),
    }),
    [],
  )
  const {
    accounts,
    latestBlockNumber,
    remoteNodeUrl,
    tokens,
  } = rh.useMappedState(mapState)
  const setLatestBlockNumber = web3Hook.useSetLatestBlockNumber()
  const {fetchFiatRate} = accountHook.useFiatRateManager()
  const fetchBalance = accountHook.useFetchBalance(web3 as Web3)
  const {fetchTokenBalance} = tokenHook.useTokenManager()

  const onConnect = useCallback((): void => {
    Reactotron.log('WS: Connected')
    setConnection(ConnectionStatus.Connected)
  }, [])

  const onError = useCallback((error): void => {
    Reactotron.error(`WS: Error: ${error.message}`)
    setConnection(ConnectionStatus.Error)
  }, [])

  const onEnd = useCallback((): void => {
    Reactotron.log('WS: Closed')
    setConnection(ConnectionStatus.End)
  }, [])

  const onNewBlockHeaders = useCallback(async (): Promise<void> => {
    if (!web3) {
      return
    }
    const blockNum = await web3.eth.getBlockNumber()
    setLatestBlockNumber(blockNum)
  }, [setLatestBlockNumber, web3])

  const connect = useCallback((): void => {
    const w = new Web3(remoteNodeUrl)
    setWeb3(w)

    // @ts-ignore
    w.currentProvider.on('connect', onConnect)
    // @ts-ignore
    w.currentProvider.on('error', onError)
    // @ts-ignore
    w.currentProvider.on('end', onEnd)
  }, [onConnect, onEnd, onError, remoteNodeUrl])

  useEffect(() => {
    ;(async () => {
      if (!web3) {
        return
      }
      if (!connection) {
        Reactotron.log('Web3: Connecting')
        connect()
        return
      }
      if (connection !== ConnectionStatus.Connected) {
        Reactotron.log('Web3: Attempting to reconnect in 5 secs')
        setTimeout(() => {
          connect()
        }, 5000)
        return
      }

      const blockNum = await web3.eth.getBlockNumber()
      setLatestBlockNumber(blockNum)

      web3.eth
        .subscribe('newBlockHeaders')
        // @ts-ignore
        .on('data', onNewBlockHeaders)
    })()
  }, [connect, connection, onNewBlockHeaders, setLatestBlockNumber, web3])

  useEffect(() => {
    connect()
  }, [connect, remoteNodeUrl])

  useEffect(() => {
    fetchFiatRate()
  }, [fetchFiatRate, latestBlockNumber])

  useEffect(() => {
    if (!web3) {
      return
    }

    accounts.map(fetchBalance)
  }, [
    accounts,
    accounts.length,
    fetchBalance,
    latestBlockNumber,
    remoteNodeUrl,
    web3,
  ])

  useEffect(() => {
    if (!web3) {
      return
    }
    tokens.map(item => fetchTokenBalance(item, web3))
  }, [
    fetchTokenBalance,
    latestBlockNumber,
    remoteNodeUrl,
    tokens,
    tokens.length,
    web3,
  ])

  return web3
}

enum ConnectionStatus {
  Connected = 'connected',
  End = 'end',
  Error = 'error',
}
