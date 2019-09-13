import * as React from 'react'
import {Field, Form} from 'react-final-form'
import {Keyboard, View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {Button, Caption, HelperText, TextInput, Title} from 'react-native-paper'
import {HorizontalPadding, Padding, VerticalPadding} from 'src/components/atoms'
import {NavigationEvent} from 'src/const'
import {useValidators} from 'src/hooks'
import {pushAccountSelector} from 'src/navigation'

export {
  AccountSelector,
} from 'src/components/screens/wallet/import/account-selector'

export interface IProps {
  componentId: string
}

export const Import = ({componentId}: IProps) => {
  const {mnemonicValidator} = useValidators()

  const onSubmit = React.useCallback(
    ({mnemonic}: {mnemonic: string}) => {
      const trimed = mnemonic.trim()
      pushAccountSelector(componentId, {mnemonic: trimed})
    },
    [componentId],
  )

  React.useEffect(() => {
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
    <Form
      onSubmit={onSubmit as any}
      // @ts-ignore
      render={({handleSubmit, pristine, submitting}) => (
        <View>
          <HorizontalPadding>
            <VerticalPadding>
              <Title>By Recovery Phrase</Title>
              <Caption>Separate each word with a single space</Caption>
            </VerticalPadding>

            <Field
              name='mnemonic'
              validate={mnemonicValidator}
              render={({input, meta}) => (
                <>
                  <TextInput
                    {...(input as any)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus
                    label='Recovery Phrase'
                    mode='outlined'
                    multiline
                    placeholder='ability bachelor cabin damage...'
                  />
                  {meta.touched && meta.error ? (
                    <HelperText type='error'>{meta.error}</HelperText>
                  ) : (
                    <HelperText>12 or 24 words</HelperText>
                  )}
                </>
              )}
            />
          </HorizontalPadding>

          <Padding>
            <Button
              disabled={pristine || submitting}
              mode='contained'
              onPress={handleSubmit as any}>
              Next
            </Button>
          </Padding>
        </View>
      )}
    />
  )
}
