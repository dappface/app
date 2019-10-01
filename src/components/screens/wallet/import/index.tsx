import {validateMnemonic} from 'bip39'
import {Formik} from 'formik'
import React, {useCallback, useEffect, useMemo} from 'react'
import {Keyboard} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Navigation} from 'react-native-navigation'
import {Button, Caption, HelperText, TextInput, Title} from 'react-native-paper'
import {HorizontalPadding, Padding, VerticalPadding} from 'src/components/atoms'
import {NavigationEvent} from 'src/const'
import {pushAccountSelector} from 'src/navigation'
import * as yup from 'yup'

export {
  AccountSelector,
} from 'src/components/screens/wallet/import/account-selector'

export interface IProps {
  componentId: string
}

export function Import({componentId}: IProps) {
  const onSubmit = useCallback(
    ({mnemonic}: {mnemonic: string}) => {
      const trimed = mnemonic.trim()
      pushAccountSelector(componentId, {mnemonic: trimed})
    },
    [componentId],
  )

  const validationSchema = useMemo(
    () =>
      yup.object({
        mnemonic: yup
          .string()
          .required()
          .test('mnemonic', 'Mnemonic is invalid', value =>
            validateMnemonic(value.trim()),
          ),
      }),
    [],
  )

  useEffect(() => {
    const listener = Navigation.events().registerNavigationButtonPressedListener(
      ({buttonId}) => {
        if (buttonId !== NavigationEvent.CancelImport) {
          return
        }
        Keyboard.dismiss()
        Navigation.dismissModal(componentId)
      },
    )
    return () => {
      listener.remove()
    }
  }, [componentId])

  return (
    <Formik
      initialValues={{mnemonic: ''}}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        touched,
        values,
      }) => (
        <KeyboardAwareScrollView>
          <HorizontalPadding>
            <VerticalPadding>
              <Title>By Recovery Phrase</Title>
              <Caption>Separate each word with a single space</Caption>
            </VerticalPadding>

            <TextInput
              onChangeText={handleChange('mnemonic')}
              onBlur={handleBlur('mnemonic')}
              autoCapitalize='none'
              autoCorrect={false}
              autoFocus
              label='Recovery Phrase'
              mode='outlined'
              multiline
              placeholder='ability bachelor cabin damage...'
              value={values.mnemonic}
            />
            {touched.mnemonic && errors.mnemonic ? (
              <HelperText type='error'>{errors.mnemonic}</HelperText>
            ) : (
              <HelperText>12 or 24 words</HelperText>
            )}
          </HorizontalPadding>

          <Padding>
            <Button disabled={!isValid} mode='contained' onPress={handleSubmit}>
              Next
            </Button>
          </Padding>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  )
}
