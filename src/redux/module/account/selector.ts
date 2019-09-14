import {createSelector} from 'reselect'
import {IState} from 'src/redux/module'
import * as accountType from 'src/redux/module/account/type'
import {entitySelector, entityType} from 'src/redux/module/entity'

export const getCurrentAccountAddress = (state: IState): string | undefined =>
  state.account.currentAccountAddress

export const getDefaultAccountAddress = (state: IState): string | undefined =>
  state.account.defaultAccountAddress

export const getFailedTransactions = (
  state: IState,
): accountType.ITransactions => state.account.failedTransactions

export const getFiatRate = (state: IState): string => state.account.fiatRate

export const getIsBackedUp = (state: IState): boolean =>
  state.account.isBackedUp

export const getMnemonic = (state: IState): string | undefined =>
  state.account.mnemonic

export const getSignRequest = (
  state: IState,
): accountType.ISignRequest | undefined => state.account.signRequest

export const getIsAccountExist = createSelector(
  getDefaultAccountAddress,
  (defaultAccountAddress: string | undefined) => !!defaultAccountAddress,
)

export const getAccounts = createSelector(
  entitySelector.getAccounts,
  getDefaultAccountAddress,
  (
    accounts: entityType.IAccounts,
    defaultAccountAddress: string | undefined,
  ): entityType.IAccount[] =>
    Object.keys(accounts)
      .map(key => accounts[key])
      .sort((a, b) => {
        const pathA = a.path.split('/')
        const indexA = pathA[pathA.length - 1]
        const pathB = b.path.split('/')
        const indexB = pathB[pathB.length - 1]
        return indexA > indexB ? 1 : -1
      })
      .sort(item => (item.address === defaultAccountAddress ? -1 : 0)),
)

export const getCurrentAccount = createSelector(
  getCurrentAccountAddress,
  entitySelector.getAccounts,
  (
    currentAccountAddress: string | undefined,
    accounts: entityType.IAccounts,
  ): entityType.IAccount | undefined =>
    currentAccountAddress ? accounts[currentAccountAddress] : undefined,
)

export const getCurrentAccountIndex = createSelector(
  getAccounts,
  getCurrentAccountAddress,
  (
    accounts: entityType.IAccount[],
    currentAccountAddress: string | undefined,
  ): number =>
    currentAccountAddress
      ? accounts.findIndex(item => item.address === currentAccountAddress)
      : -1,
)

export const getCurrentAccountFailedTransactions = createSelector(
  getCurrentAccountAddress,
  getFailedTransactions,
  (
    currentAccountAddress: string | undefined,
    failedTransactions: accountType.ITransactions,
  ): accountType.ITransaction[] =>
    (currentAccountAddress ? failedTransactions[currentAccountAddress] : []) ||
    [],
)

export const getDefaultAccountEntity = createSelector(
  getDefaultAccountAddress,
  entitySelector.getAccounts,
  (
    defaultAccountAddress: string | undefined,
    accounts: entityType.IAccounts,
  ): entityType.IAccount | undefined =>
    defaultAccountAddress ? accounts[defaultAccountAddress] : undefined,
)

export const getDefaultAccountAddresses = createSelector(
  getDefaultAccountAddress,
  (defaultAddress: string | undefined): string[] =>
    defaultAddress ? [defaultAddress] : [],
)

export const getIsCurrentAccountDefault = createSelector(
  getCurrentAccountAddress,
  getDefaultAccountAddress,
  (
    currentAccountAddress: string | undefined,
    defaultAccountAddress: string | undefined,
  ): boolean =>
    !!currentAccountAddress &&
    !!defaultAccountAddress &&
    currentAccountAddress === defaultAccountAddress,
)
