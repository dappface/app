import {ITokenCandidate} from 'lib/token-list.json'
import {entityType} from 'src/redux/module/entity'
import Web3 from 'web3'

export interface ITokenManager {
  addToken: (tokenCandidate: ITokenCandidate) => void
  removeToken: (token: entityType.IToken) => void
  fetchTokenBalance: (token: entityType.IToken, web3: Web3) => Promise<void>
}
