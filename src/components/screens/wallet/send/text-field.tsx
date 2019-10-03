import BN from 'bignumber.js'
import {FieldValidator, useFormikContext, useField} from 'formik'
import React, {useCallback} from 'react'
import {HelperText, TextInput, TextInputProps} from 'react-native-paper'
import {useSelector} from 'react-redux'

import {Expanded} from 'src/components/atoms'
import {accountSelector} from 'src/redux/module/account'
import {settingSelector} from 'src/redux/module/setting'
import {HelperTextType} from './shared'
import {validateAmount} from './validator'

interface ITextFieldProps extends TextInputProps {
  helperText?: HelperTextType
  name: string
  validate?: FieldValidator
}

export const TextField = React.forwardRef(
  ({name, validate, helperText, ...textInputProps}: ITextFieldProps, ref) => {
    const [field, meta] = useField({name, validate})
    return (
      <Expanded.View>
        <TextInput
          {...textInputProps}
          autoCapitalize='none'
          autoCorrect={false}
          mode='outlined'
          onBlur={field.onBlur(name)}
          onChangeText={field.onChange(name)}
          // @ts-ignore
          ref={ref}
          value={field.value}
        />
        {meta.touched && meta.error ? (
          <HelperText type='error'>{meta.error}</HelperText>
        ) : (
          <HelperText>
            {typeof helperText === 'function'
              ? helperText(field.value)
              : helperText}
          </HelperText>
        )}
      </Expanded.View>
    )
  },
)

interface IAmountTextFieldProps {
  showAdvancedOptions: boolean
  focusGasLimit: () => void
}

export const AmountTextField = React.forwardRef<
  TextInput,
  IAmountTextFieldProps
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
      <TextField
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
