export enum Network {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Kovan = 42
}

export const Networks: { [key: number]: INetwork } = {
  [Network.Mainnet]: {
    etherscanApiUrl: 'https://api.etherscan.io/api',
    etherscanUrl: 'https://etherscan.io',
    name: 'Mainnet',
    remoteNodeUrl: 'mainnet.infura.io'
  },
  [Network.Ropsten]: {
    etherscanApiUrl: 'https://api-ropsten.etherscan.io/api',
    etherscanUrl: 'https://ropsten.etherscan.io',
    name: 'Ropsten Testnet',
    remoteNodeUrl: 'ropsten.infura.io'
  },
  [Network.Rinkeby]: {
    etherscanApiUrl: 'https://api-rinkeby.etherscan.io/api',
    etherscanUrl: 'https://rinkeby.etherscan.io',
    name: 'Rinkeby Testnet',
    remoteNodeUrl: 'rinkeby.infura.io'
  },
  [Network.Kovan]: {
    etherscanApiUrl: 'https://api-kovan.etherscan.io/api',
    etherscanUrl: 'https://kovan.etherscan.io',
    name: 'Kovan Testnet',
    remoteNodeUrl: 'kovan.infura.io'
  }
}

export interface INetwork {
  etherscanApiUrl: string
  etherscanUrl: string
  name: string
  remoteNodeUrl: string
}
