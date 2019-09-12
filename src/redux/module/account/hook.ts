import BN from 'bignumber.js'
import { entropyToMnemonic } from 'bip39'
import wordlist from 'bip39/src/wordlists/english.json'
import { Wallet } from 'ethers'
import moment from 'moment'
import { useCallback } from 'react'
import Reactotron from 'reactotron-react-native'
import { useDispatch, useMappedState } from 'redux-react-hook'
import { AccountPath } from 'src/const'
import { useWeb3 } from 'src/hooks'
import { IState as IAllState } from 'src/redux/module'
import * as accountAction from 'src/redux/module/account/action'
import * as accountSelector from 'src/redux/module/account/selector'
import * as accountType from 'src/redux/module/account/type'
import { entityAction, entityType, entityUtil } from 'src/redux/module/entity'
import { settingSelector } from 'src/redux/module/setting'
import { exchangeRelay, randomBytesAsync } from 'src/utils'
import Web3 from 'web3'

export const useSetSignRequest = () => {
  const dispatch = useDispatch()
  return useCallback((params?: accountType.ISignRequest) => {
    dispatch(accountAction.setSignRequest(params))
  }, [])
}

export const useFiatRateManager = () => {
  const mapState = useCallback(
    (state: IAllState) => ({
      currency: settingSelector.getCurrency(state)
    }),
    []
  )
  const { currency } = useMappedState(mapState)
  const dispatch = useDispatch()

  const fetchFiatRate = useCallback(async () => {
    try {
      const fiatRate = await exchangeRelay.getRate(currency)
      dispatch(accountAction.setFiatRate(fiatRate))
    } catch (error) {
      Reactotron.error(`Failed to fetch rate: Error: ${error}`)
    }
  }, [currency])

  return {
    fetchFiatRate
  }
}

export const useFetchBalance = (web3: Web3) => {
  const mapState = useCallback(
    (state: IAllState) => ({
      currencyDetails: settingSelector.getCurrencyDetails(state),
      fiatRate: accountSelector.getFiatRate(state)
    }),
    []
  )
  const { currencyDetails, fiatRate } = useMappedState(mapState)
  const dispatch = useDispatch()

  return useCallback(
    async (account: entityType.IAccount) => {
      const wei = await web3.eth.getBalance(account.address)
      const ether = web3.utils.fromWei(wei, 'ether')
      const fiatBN = new BN(ether).multipliedBy(fiatRate)
      const fiat = fiatBN.toFormat(currencyDetails.decimalDigits)
      dispatch(
        entityAction.setAccount({
          ...account,
          balance: {
            ether,
            fiat,
            wei
          }
        })
      )
    },
    [fiatRate, web3]
  )
}

export const useSignAndSendTransaction = () => {
  const web3 = useWeb3()
  const mapState = useCallback(
    (state: IAllState) => ({
      network: settingSelector.getNetwork(state)
    }),
    []
  )
  const { network } = useMappedState(mapState)
  const dispatch = useDispatch()

  return useCallback(
    async (
      a: entityType.IAccount,
      txParams: accountType.ITransactionParams
    ) => {
      const nonce = await web3.eth.getTransactionCount(a.address)
      const rawTx = {
        chainId: network,
        gasLimit: web3.utils.toHex(txParams.gasLimit),
        gasPrice: web3.utils.toHex(txParams.gasPrice),
        nonce: web3.utils.toHex(nonce),
        to: txParams.to,
        value: web3.utils.toHex(txParams.value)
      }
      const wallet = new Wallet(a.privKey)
      const signedTx = await wallet.sign(rawTx)

      web3.eth.sendSignedTransaction(signedTx).on('error', error => {
        const failedTransaction: accountType.ITransaction = {
          ...txParams,
          address: a.address,
          chainId: network,
          errorMessage: error.message,
          from: a.address,
          hash: signedTx,
          nonce: 0,
          timeStamp: moment().unix()
        }
        dispatch(accountAction.addFailedTransaction(failedTransaction))
      })
    },
    [network, web3.currentProvider]
  )
}

interface IAccountManager {
  createAccount: () => Promise<void>
  importAccountCandidates: (
    mnemonic: string,
    candidates: accountType.IAccountCandidate[]
  ) => void
  setCurrentAccountAsDefault: () => void
  setCurrentAccountAddressByIndex: (index: number) => void
  setIsBackedUp: (isBackedUp: boolean) => void
}

export function useAccountManager(): IAccountManager {
  const mapState = useCallback(
    (state: IAllState) => ({
      accounts: accountSelector.getAccounts(state),
      currentAccountAddress: accountSelector.getCurrentAccountAddress(state)
    }),
    []
  )
  const { accounts, currentAccountAddress } = useMappedState(mapState)
  const dispatch = useDispatch()

  const createAccount: IAccountManager['createAccount'] = useCallback(async () => {
    const entropy = await randomBytesAsync()
    const mnemonic = entropyToMnemonic(entropy as Buffer, wordlist)
    const path = `${AccountPath[0]}/0`
    const wallet = Wallet.fromMnemonic(mnemonic, path)
    const a = entityUtil.createAccount({
      address: wallet.address,
      path: wallet.path,
      privKey: wallet.privateKey
    })
    dispatch(entityAction.setAccount(a))
    dispatch(accountAction.setMnemonic(mnemonic))
    dispatch(accountAction.setCurrentAccountAddress(a.address))
    dispatch(accountAction.setDefaultAccountAddress(a.address))
  }, [])

  const setIsBackedUp = useCallback<IAccountManager['setIsBackedUp']>(
    isBackedUp => {
      dispatch(accountAction.setIsBackedUp(isBackedUp))
    },
    []
  )

  const importAccountCandidates: IAccountManager['importAccountCandidates'] = useCallback(
    (mnemonic, candidates) => {
      const res = candidates
        .filter(item => item.isSelected)
        .map((item: accountType.IAccountCandidate) => {
          const a = entityUtil.createAccount({
            address: item.address,
            path: item.path,
            privKey: item.privKey
          })
          dispatch(entityAction.setAccount(a))
          return a
        })
      dispatch(accountAction.setMnemonic(mnemonic))
      setIsBackedUp(true)
      dispatch(accountAction.setCurrentAccountAddress(res[0].address))
      dispatch(accountAction.setDefaultAccountAddress(res[0].address))
    },
    []
  )

  const setCurrentAccountAddressByIndex = useCallback<
    IAccountManager['setCurrentAccountAddressByIndex']
  >(
    index => {
      dispatch(accountAction.setCurrentAccountAddress(accounts[index].address))
    },
    [accounts]
  )

  const setCurrentAccountAsDefault = useCallback<
    IAccountManager['setCurrentAccountAsDefault']
  >(() => {
    dispatch(accountAction.setDefaultAccountAddress(currentAccountAddress))
  }, [currentAccountAddress])

  return {
    createAccount,
    importAccountCandidates,
    setCurrentAccountAddressByIndex,
    setCurrentAccountAsDefault,
    setIsBackedUp
  }
}
