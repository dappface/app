import {WebSocketNodeConnection} from '@dappface/ethereum-provider'
import {useMemo} from 'react'
import {useSelector} from 'react-redux'

import {settingSelector} from 'src/redux/module/setting'

// export function useWebSocketNodeConnection() {
//   const remoteNodeUrl = useSelector(
//     settingSelector.getRemoteNodeUrlFactory(true),
//   )
//   const connection = useMemo(() => new WebSocketNodeConnection(remoteNodeUrl), [
//     remoteNodeUrl,
//   ])

//   return connection
// }

// export function useEthereum() {
//   const remoteNodeUrl = useSelector(
//     settingSelector.getRemoteNodeUrlFactory(true),
//   )
//   const ethereum = useMemo(() => new EthereumProvider({url: remoteNodeUrl}), [
//     remoteNodeUrl,
//   ])

//   return ethereum
// }
