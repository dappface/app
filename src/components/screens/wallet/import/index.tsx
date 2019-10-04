import {useNavigation} from '@react-navigation/core'
import {Formik} from 'formik'
import React, {useCallback, useMemo} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Caption, Title} from 'react-native-paper'

import {HorizontalPadding, Padding, VerticalPadding} from 'src/components/atoms'
import {FormField} from 'src/components/molecules'
import {ModalTemplate} from 'src/components/templates'
import {ScreenName} from 'src/const'
import {Submit} from './submit'
import {validateMnemonic} from './validator'

export {
  AccountSelector,
} from 'src/components/screens/wallet/import/account-selector'

export function Import() {
  const navigation = useNavigation()

  const initialValues = useMemo<IValues>(
    () => ({
      mnemonic: '',
    }),
    [],
  )

  const onSubmit = useCallback(
    ({mnemonic}: IValues) => {
      navigation.navigate(ScreenName.WalletImportAccountSelector, {
        mnemonic: mnemonic.trim(),
      })
    },
    [navigation],
  )

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <ModalTemplate text='cancel'>
        <KeyboardAwareScrollView>
          <HorizontalPadding>
            <VerticalPadding>
              <Title>By Recovery Phrase</Title>
              <Caption>Separate each word with a single space</Caption>
            </VerticalPadding>

            <FormField
              autoFocus
              helperText='12 or 24 words'
              label='Recovery Phrase'
              name='mnemonic'
              placeholder='ability bachelor cabin damage...'
              validate={validateMnemonic}
            />
          </HorizontalPadding>

          <Padding>
            <Submit />
          </Padding>
        </KeyboardAwareScrollView>
      </ModalTemplate>
    </Formik>
  )
}

interface IValues {
  mnemonic: ''
}
