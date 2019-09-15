import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Reactotron from 'reactotron-react-native'
import {useSelector} from 'react-redux'
import {accountHook, accountSelector} from 'src/redux/module/account'
import {settingSelector} from 'src/redux/module/setting'
import {tokenHook, tokenSelector} from 'src/redux/module/token'
import {web3Hook, web3Selector} from 'src/redux/module/web3'
import Web3 from 'web3'

export const useWeb3 = () => useContext(Web3Context) as Web3

export const Web3Context = createContext<Web3 | undefined>(undefined)

export function useInitializedWeb3(): Web3 | undefined {
  const [connection, setConnection] = useState<ConnectionStatus | undefined>()
  const [web3, setWeb3] = useState<Web3>()
  const accounts = useSelector(accountSelector.getAccounts)
  const latestBlockNumber = useSelector(web3Selector.getLatestBlockNumber)
  const remoteNodeUrl = useSelector(
    settingSelector.getRemoteNodeUrlFactory(true),
  )
  const tokens = useSelector(tokenSelector.getTokens)
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
    Reactotron.log('Web3: Connecting')
    const w = new Web3(remoteNodeUrl)
    setWeb3(w)
    setConnection(ConnectionStatus.Connecting)

    // @ts-ignore
    w.currentProvider.on('connect', onConnect)
    // @ts-ignore
    w.currentProvider.on('error', onError)
    // @ts-ignore
    w.currentProvider.on('end', onEnd)
  }, [onConnect, onEnd, onError, remoteNodeUrl])

  useEffect(() => {
    ;(async () => {
      if (!web3 || connection === ConnectionStatus.Connecting) {
        return
      }

      if (
        connection === ConnectionStatus.Error ||
        connection === ConnectionStatus.End
      ) {
        Reactotron.log('Web3: Attempting to reconnect in 5 secs')
        setTimeout(() => {
          connect()
        }, 5000)
      }
    })()
  }, [connect, connection, web3])

  useEffect(() => {
    ;(async () => {
      if (!web3 || connection !== ConnectionStatus.Connected) {
        return
      }
      const blockNum = await web3.eth.getBlockNumber()
      setLatestBlockNumber(blockNum)

      web3.eth
        .subscribe('newBlockHeaders')
        // @ts-ignore
        .on('data', onNewBlockHeaders)
    })()
  }, [connection, onNewBlockHeaders, setLatestBlockNumber, web3])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts.length, fetchBalance, latestBlockNumber, remoteNodeUrl, web3])

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
  Connected,
  Connecting,
  End,
  Error,
}
