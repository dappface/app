import BN from 'bignumber.js'
import {validateMnemonic} from 'bip39'
import wordlist from 'bip39/src/wordlists/english.json'
import {FieldProps} from 'react-final-form'
import {useWeb3} from 'src/hooks'
import {entityType} from 'src/redux/module/entity'

interface IValidators {
  addressValidator: Validator
  amountValidatorFactory: (account: entityType.IAccount) => Validator
  gasPriceValidator: Validator
  mnemonicValidator: Validator
  required: Validator
}

export const useValidators = (): IValidators => {
  const web3 = useWeb3()

  const compose: Compose = (...validators) => (value, allValues) =>
    validators.reduce(
      // @ts-ignore
      (error, validator) => error || validator(value, allValues),
      undefined,
    )

  const mustBeAddress: Validator = value =>
    web3.utils.isAddress(value) ? undefined : 'invalid address'

  const mustBeLessThanMaxTotalFactory = (a: entityType.IAccount): Validator => (
    value,
    allValues,
  ) => {
    if (
      !a.balance.wei ||
      !(allValues as ISendFormValues).gasPrice ||
      !(allValues as ISendFormValues).gasLimit
    ) {
      return
    }
    const balance = new BN(a.balance.wei)
    const amount = web3.utils.toWei(value, 'ether')
    const gasPrice = new BN(
      web3.utils.toWei((allValues as ISendFormValues).gasPrice, 'Gwei'),
    )
    const maxGas = gasPrice.multipliedBy(
      (allValues as ISendFormValues).gasLimit,
    )
    const maxTotal = maxGas.plus(amount.toString())

    return balance.isLessThan(maxTotal) ? 'Insufficient funds' : undefined
  }

  const mustBeMnemonic: Validator = (mnemonic: string) => {
    const trimed = mnemonic.trim()
    return validateMnemonic(trimed, wordlist)
      ? undefined
      : 'Mnemonic is invalid'
  }

  const mustBeNatural: Validator = value =>
    parseInt(value, 10) >= 0 ? undefined : 'Must be number'

  const required: Validator = value => (value ? undefined : 'Required')

  const mnemonicValidator: Validator = compose(
    required,
    mustBeMnemonic,
  )

  const addressValidator: Validator = compose(
    required,
    mustBeAddress,
  )

  const amountValidatorFactory = (
    currentAccount: entityType.IAccount,
  ): Validator =>
    compose(
      required,
      mustBeNatural,
      mustBeLessThanMaxTotalFactory(currentAccount),
    )

  const gasPriceValidator: Validator = compose(
    required,
    mustBeNatural,
  )

  return {
    addressValidator,
    amountValidatorFactory,
    gasPriceValidator,
    mnemonicValidator,
    required,
  }
}

type Validator = FieldProps<HTMLElement>['validate']

export interface ISendFormValues {
  amount: string
  gasPrice: string
  gasLimit: string
  to: string
}

type Compose = (...validators: Validator[]) => Validator
