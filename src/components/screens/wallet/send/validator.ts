import BN from 'bignumber.js'
import {utils as ethersUtils} from 'ethers'
import {FormikErrors, FieldValidator} from 'formik'
import {useCallback} from 'react'
import {useSelector} from 'react-redux'

import {accountSelector} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'

export interface IValues {
  to: string
  amount: string
  gasLimit: string
  gasPrice: string
}

interface IErrors {
  [key: string]: string
}

type ValidateForm = (
  values: IValues,
) => void | object | Promise<FormikErrors<IValues>>

export function useValidateForm(): ValidateForm {
  const currentAccount = useSelector(
    accountSelector.getCurrentAccount,
  ) as entityType.IAccount

  return useCallback<ValidateForm>(
    values => {
      const errors: IErrors = {}

      if (
        currentAccount.balance.wei === '' ||
        values.amount === '' ||
        values.gasPrice === '' ||
        values.gasLimit === '' ||
        Number.isNaN(Number(currentAccount.balance.wei)) ||
        Number.isNaN(Number(values.amount)) ||
        Number.isNaN(Number(values.gasPrice)) ||
        Number.isNaN(Number(values.gasLimit))
      ) {
        return errors
      }

      const balance = ethersUtils.parseUnits(currentAccount.balance.wei, 'wei')
      const amount = ethersUtils.parseEther(values.amount)
      const gasPrice = ethersUtils.parseUnits(values.gasPrice, 'gwei')
      const maxGas = gasPrice.mul(values.gasLimit)
      const maxTotal = amount.add(maxGas)
      if (balance.lt(maxTotal)) {
        errors.amount = 'Insufficient funds'
      }
    },
    [currentAccount],
  )
}

export const validateTo: FieldValidator = value => {
  if (value === '') {
    return 'Required'
  }
  if (!ethersUtils.isAddress(value)) {
    return 'Invalid Address'
  }
}

export const validateAmount: FieldValidator = value => {
  if (value === '') {
    return 'Required'
  }
  if (Number.isNaN(Number(value)) || new BN(value).isLessThan(0)) {
    return 'Invalid amount'
  }
}

export const validateGasLimit: FieldValidator = value => {
  if (value === '') {
    return 'Required'
  }
}

export const validateGasPrice: FieldValidator = value => {
  if (value === '') {
    return 'Required'
  }
}
