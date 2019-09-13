import {Network} from 'src/const'
import {ActionType} from 'src/redux/module/account/action-type'

export interface IState {
  currentAccountAddress?: string // persisted
  defaultAccountAddress?: string // persisted
  failedTransactions: ITransactions
  fiatRate: string
  isBackedUp: boolean // persisted
  mnemonic?: string // persisted
  signRequest?: ISignRequest
}

export type Actions =
  | ISetCurrentAccountAddress
  | ISetDefaultAccountAddress
  | ISetFiatRate
  | IAddFailedTransaction
  | ISetIsBackedUp
  | ISetMnemonic
  | ISetSignRequest

export interface ISetCurrentAccountAddress {
  payload: {currentAccountAddress?: string}
  type: ActionType.SET_CURRENT_ACCOUNT_ADDRESS
}

export interface ISetDefaultAccountAddress {
  payload: {defaultAccountAddress?: string}
  type: ActionType.SET_DEFAULT_ACCOUNT_ADDRESS
}

export interface ISetFiatRate {
  payload: {fiatRate: string}
  type: ActionType.SET_FIAT_RATE
}

export interface IAddFailedTransaction {
  payload: {failedTransaction: ITransaction}
  type: ActionType.ADD_FAILED_TRANSACTION
}

export interface ISetIsBackedUp {
  payload: {isBackedUp: boolean}
  type: ActionType.SET_IS_BACKED_UP
}

export interface ISetMnemonic {
  payload: {mnemonic?: string}
  type: ActionType.SET_MNEMONIC
}

export interface ISetSignRequest {
  payload: {signRequest: ISignRequest}
  type: ActionType.SET_SIGN_REQUEST
}

export interface IAccountCandidate {
  address: string
  isSelected: boolean
  path: string
  privKey: string
}

export interface ITransactions {
  [key: string]: ITransaction[]
}

export interface ITransaction {
  address: string
  chainId: Network
  errorMessage?: string
  from: string
  gasLimit?: number
  gasPrice: string
  hash: string
  nonce: number
  timeStamp: number
  to: string
  value: string
}

export interface ITransactionParams {
  gasLimit: number
  gasPrice: string
  to: string
  value: string
}

export interface ISignRequest {
  callbackId: string
  from: string
  tabId: string
  to: string
  value: string
}
