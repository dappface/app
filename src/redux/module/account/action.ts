import {ActionType} from 'src/redux/module/account/action-type'
import * as accountType from 'src/redux/module/account/type'

export const setCurrentAccountAddress = (
  currentAccountAddress?: string,
): accountType.ISetCurrentAccountAddress => ({
  payload: {currentAccountAddress},
  type: ActionType.SET_CURRENT_ACCOUNT_ADDRESS,
})

export const setDefaultAccountAddress = (
  defaultAccountAddress?: string,
): accountType.ISetDefaultAccountAddress => ({
  payload: {defaultAccountAddress},
  type: ActionType.SET_DEFAULT_ACCOUNT_ADDRESS,
})

export const setFiatRate = (fiatRate: string): accountType.ISetFiatRate => ({
  payload: {fiatRate},
  type: ActionType.SET_FIAT_RATE,
})

export const addFailedTransaction = (
  failedTransaction: accountType.ITransaction,
): accountType.IAddFailedTransaction => ({
  payload: {failedTransaction},
  type: ActionType.ADD_FAILED_TRANSACTION,
})

export const setIsBackedUp = (
  isBackedUp: boolean,
): accountType.ISetIsBackedUp => ({
  payload: {isBackedUp},
  type: ActionType.SET_IS_BACKED_UP,
})

export const setMnemonic = (
  mnemonic: string | undefined,
): accountType.ISetMnemonic => ({
  payload: {mnemonic},
  type: ActionType.SET_MNEMONIC,
})

export const setSignRequest = (signRequest?: accountType.ISignRequest) => ({
  payload: {signRequest},
  type: ActionType.SET_SIGN_REQUEST,
})
