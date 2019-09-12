import {ActionType} from 'src/redux/module/account/action-type'
import {Actions, IState} from 'src/redux/module/account/type'

export const initialState: IState = {
  failedTransactions: {},
  fiatRate: '',
  isBackedUp: false,
}

export function reducer(state: IState = initialState, action: Actions) {
  switch (action.type) {
    case ActionType.SET_CURRENT_ACCOUNT_ADDRESS:
      return {
        ...state,
        currentAccountAddress: action.payload.currentAccountAddress,
      }
    case ActionType.SET_DEFAULT_ACCOUNT_ADDRESS:
      return {
        ...state,
        defaultAccountAddress: action.payload.defaultAccountAddress,
      }
    case ActionType.SET_FIAT_RATE:
      return {
        ...state,
        fiatRate: action.payload.fiatRate,
      }
    case ActionType.ADD_FAILED_TRANSACTION:
      return {
        ...state,
        failedTransactions: {
          ...state.failedTransactions,
          [action.payload.failedTransaction.from]: [
            ...state.failedTransactions[action.payload.failedTransaction.from],
            action.payload.failedTransaction,
          ],
        },
      }
    case ActionType.SET_IS_BACKED_UP:
      return {...state, isBackedUp: action.payload.isBackedUp}
    case ActionType.SET_MNEMONIC:
      return {...state, mnemonic: action.payload.mnemonic}
    case ActionType.SET_SIGN_REQUEST:
      return {...state, signRequest: action.payload.signRequest}
    default:
      return state
  }
}
