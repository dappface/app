import {
  EthereumProvider,
  ReactNativeWalletConnection,
  ReactNativeWebSocketNodeConnection,
} from '@dappface/ethereum-provider'

declare global {
  interface Window {
    ethereum: EthereumProvider
  }
}

const walletConnection = new ReactNativeWalletConnection()
const nodeConnection = new ReactNativeWebSocketNodeConnection()
const ethereum = new EthereumProvider({
  nodeConnection,
  walletConnection,
})

window.ethereum = ethereum
