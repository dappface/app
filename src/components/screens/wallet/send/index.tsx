import {utils as ethersUtils} from 'ethers'
import {Formik} from 'formik'
import React, {useCallback, useMemo, useRef, useState} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {
  IconButton,
  List,
  Subheading,
  Switch,
  TextInput,
} from 'react-native-paper'

import {Expanded, HorizontalPadding, Padding, Row} from 'src/components/atoms'
import {FormField} from 'src/components/molecules'
import {ModalTemplate} from 'src/components/templates'
import {IScreenProps} from 'src/components/screens/shared'
import {ScreenName} from 'src/const'
import {accountType} from 'src/redux/module/account'
import {useGasPriceInfo} from './hooks'
import {RecipientBlockie} from './receipient-blockie'
import {AlignTopRow, RowWithUnit, SubInfoContainer} from './shared'
import {Submit} from './submit'
import {AmountFormField} from './amount-form-field'
import {
  IValues,
  useValidateForm,
  validateTo,
  validateGasLimit,
  validateGasPrice,
} from './validator'

export function SendScreen({navigation}: IScreenProps) {
  const validateForm = useValidateForm()
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [to, setTo] = useState('')
  const {
    recommendedGasPrice,
    helperText: gasPriceHelperText,
  } = useGasPriceInfo()
  const initialValues = useMemo<IValues>(
    () => ({
      to,
      amount: '',
      gasLimit: '21000',
      gasPrice: recommendedGasPrice,
    }),
    [to, recommendedGasPrice],
  )

  const amountInputRef = useRef<TextInput>()
  const gasLimitInputRef = useRef<TextInput>()
  const gasPriceInputRef = useRef<TextInput>()

  const focusAmount = useCallback(() => {
    if (!amountInputRef.current) {
      return
    }
    amountInputRef.current.focus()
  }, [])
  const focusGasLimit = useCallback(() => {
    if (!gasLimitInputRef.current) {
      return
    }
    gasLimitInputRef.current.focus()
  }, [])
  const focusGasPrice = useCallback(() => {
    if (!gasPriceInputRef.current) {
      return
    }
    gasPriceInputRef.current.focus()
  }, [])

  const handlePressScan = useCallback((): void => {
    navigation.navigate(ScreenName.WalletScanScreen, {setTo})
  }, [navigation])

  const onSubmit = useCallback(
    (values: IValues): void => {
      const txParams: accountType.ITransactionParams = {
        gasLimit: Number(values.gasLimit),
        gasPrice: ethersUtils.parseUnits(values.gasPrice, 'gwei').toString(),
        to: values.to,
        value: ethersUtils.parseEther(values.amount).toString(),
      }

      navigation.navigate(ScreenName.WalletSendConfirmScreen, {txParams})
    },
    [navigation],
  )

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateForm}>
      <ModalTemplate text='cancel'>
        <KeyboardAwareScrollView>
          <List.Section>
            <AlignTopRow>
              <RecipientBlockie />
              <FormField
                autoFocus
                helperText='Required'
                label='Recipient address'
                mode='outlined'
                name='to'
                onSubmitEditing={focusAmount}
                placeholder='0x1234...'
                returnKeyType='next'
                validate={validateTo}
              />
              <SubInfoContainer>
                <IconButton
                  icon='crop-free'
                  onPress={handlePressScan}
                  size={24}
                />
              </SubInfoContainer>
            </AlignTopRow>

            <RowWithUnit>
              <AmountFormField
                focusGasLimit={focusGasLimit}
                ref={amountInputRef as React.RefObject<TextInput>}
                showAdvancedOptions={showAdvancedOptions}
              />
              <SubInfoContainer>
                <Subheading>ETH</Subheading>
              </SubInfoContainer>
            </RowWithUnit>
          </List.Section>

          <List.Section>
            <Row>
              <Expanded.View>
                <List.Subheader>Advanced Options</List.Subheader>
              </Expanded.View>
              <HorizontalPadding>
                <Switch
                  onValueChange={setShowAdvancedOptions}
                  value={showAdvancedOptions}
                />
              </HorizontalPadding>
            </Row>

            {showAdvancedOptions && (
              <>
                <HorizontalPadding>
                  <FormField
                    helperText='Required'
                    keyboardType='numeric'
                    label='Gas Limit'
                    name='gasLimit'
                    onSubmitEditing={focusGasPrice}
                    placeholder='21000'
                    ref={gasLimitInputRef}
                    returnKeyType='next'
                    validate={validateGasLimit}
                  />
                </HorizontalPadding>
                <RowWithUnit>
                  <FormField
                    helperText={gasPriceHelperText}
                    keyboardType='numeric'
                    label='Gas Price'
                    name='gasPrice'
                    placeholder={recommendedGasPrice}
                    ref={gasPriceInputRef}
                    validate={validateGasPrice}
                  />
                  <SubInfoContainer>
                    <Subheading>Gwei</Subheading>
                  </SubInfoContainer>
                </RowWithUnit>
              </>
            )}
          </List.Section>

          <Padding>
            <Submit />
          </Padding>
        </KeyboardAwareScrollView>
      </ModalTemplate>
    </Formik>
  )
}
