import BN from 'bignumber.js'
import {useFormikContext} from 'formik'
import React, {useCallback} from 'react'
import {TextInput} from 'react-native-paper'
import {useSelector} from 'react-redux'

import {accountSelector} from 'src/redux/module/account'
import {settingSelector} from 'src/redux/module/setting'
import {FormField} from 'src/components/molecules'
import {validateAmount} from './validator'

interface IAmountFormFieldProps {
  showAdvancedOptions: boolean
  focusGasLimit: () => void
}

export const AmountFormField = React.forwardRef<
  TextInput,
  IAmountFormFieldProps
>(
  // eslint-disable-next-line react/prop-types
  ({showAdvancedOptions, focusGasLimit}, ref) => {
    const fiatRate = useSelector(accountSelector.getFiatRate)
    const currencyDetails = useSelector(settingSelector.getCurrencyDetails)
    const {handleSubmit} = useFormikContext()

    const helperText = useCallback(
      (value: string): string => {
        if (!value) {
          return 'Required'
        }

        if (Number.isNaN(Number(value))) {
          return '≈ *'
        }

        return `≈ ${new BN(value)
          .multipliedBy(fiatRate)
          .toFormat(currencyDetails.decimalDigits)} ${currencyDetails.code}`
      },
      [fiatRate, currencyDetails],
    )

    const handleSubmitEditing = useCallback((): void => {
      if (!showAdvancedOptions) {
        handleSubmit()
        return
      }
      focusGasLimit()
    }, [showAdvancedOptions, handleSubmit, focusGasLimit])

    return (
      <FormField
        helperText={helperText}
        keyboardType='numeric'
        name='amount'
        onSubmitEditing={handleSubmitEditing}
        placeholder='3.14'
        ref={ref}
        returnKeyType={showAdvancedOptions ? 'next' : 'go'}
        validate={validateAmount}
      />
    )
  },
)
