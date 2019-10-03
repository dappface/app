import {FieldValidator, useFormikContext, useField} from 'formik'
import React from 'react'
import {HelperText, TextInput, TextInputProps} from 'react-native-paper'

import {Expanded} from '../atoms'

export type HelperTextType = string | ((value: string) => string)

interface IFormFieldProps extends TextInputProps {
  helperText?: HelperTextType
  name: string
  validate?: FieldValidator
}

export const FormField = React.forwardRef(
  ({name, validate, helperText, ...textInputProps}: IFormFieldProps, ref) => {
    const {handleSubmit} = useFormikContext()
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
          onSubmitEditing={textInputProps.onSubmitEditing || handleSubmit}
          // @ts-ignore
          ref={ref}
          returnKeyType={textInputProps.returnKeyType || 'go'}
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
