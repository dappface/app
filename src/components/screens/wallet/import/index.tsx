import {Formik} from 'formik'
import React, {useCallback, useEffect, useMemo} from 'react'
import {Keyboard} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Navigation} from 'react-native-navigation'
import {Caption, Title} from 'react-native-paper'

import {HorizontalPadding, Padding, VerticalPadding} from 'src/components/atoms'
import {FormField} from 'src/components/molecules'
import {NavigationEvent} from 'src/const'
import {pushAccountSelector} from 'src/navigation'
import {Submit} from './submit'
import {validateMnemonic} from './validator'

export {
  AccountSelector,
} from 'src/components/screens/wallet/import/account-selector'

export interface IProps {
  componentId: string
}

export function Import({componentId}: IProps) {
  const initialValues = useMemo<IValues>(
    () => ({
      mnemonic: '',
    }),
    [],
  )

  const onSubmit = useCallback(
    ({mnemonic}: IValues) => {
      const trimed = mnemonic.trim()
      pushAccountSelector(componentId, {mnemonic: trimed})
    },
    [componentId],
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
    </Formik>
  )
}

interface IValues {
  mnemonic: ''
}
