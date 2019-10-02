import BN from 'bignumber.js'
import {Formik, FieldValidator, useFormikContext, useField} from 'formik'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  HelperText,
  IconButton,
  List,
  Subheading,
  Switch,
  TextInput,
  TextInputProps,
} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useSelector} from 'react-redux'
import {
  Blockie,
  Expanded,
  HorizontalPadding,
  Padding,
  Row,
} from 'src/components/atoms'
import {Color, Size} from 'src/const'
import {ISendFormValues, useWeb3} from 'src/hooks'
import {pushComfirmSend, showWalletScan} from 'src/navigation'
import {accountSelector, accountType} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'
import {gasStation} from 'src/utils'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
}

interface IGasInfo {
  average: number
  fast: number
  safeLow: number
}

export function Send({componentId}: IProps) {
  const web3 = useWeb3()
  const currentAccount = useSelector(
    accountSelector.getCurrentAccount,
  ) as entityType.IAccount
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [to, setTo] = useState('')
  const {
    recommendedGasPrice,
    helperText: gasPriceHelperText,
  } = useGasPriceInfo()

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
    showWalletScan({setTo})
  }, [])

  const onSubmit = useCallback(
    (values: ISendFormValues): void => {
      const amount = new BN(web3.utils.toWei(values.amount, 'ether'))
      const gasPrice = new BN(web3.utils.toWei(values.gasPrice, 'Gwei'))
      const gasLimit = new BN(values.gasLimit)
      const txParams: accountType.ITransactionParams = {
        gasLimit: gasLimit.toNumber(),
        gasPrice: gasPrice.toString(),
        to: values.to,
        value: amount.toString(),
      }

      pushComfirmSend(componentId, {txParams})
    },
    [componentId, web3.utils],
  )

  return (
    <Formik
      initialValues={{
        to,
        amount: '',
        gasLimit: '21000',
        gasPrice: recommendedGasPrice,
      }}
      onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <KeyboardAwareScrollView>
          <List.Section>
            <AlignTopRow>
              <RecipientBlockie />
              <TextField
                name='to'
                label='Recipient address'
                mode='outlined'
                placeholder='0x1234...'
                helperText='Required'
                validate={value => (value === '' ? 'Required' : undefined)}
                autoFocus
                returnKeyType='next'
                onSubmitEditing={focusAmount}
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
              <AmountTextField
                showAdvancedOptions={showAdvancedOptions}
                focusGasLimit={focusGasLimit}
                ref={amountInputRef as React.RefObject<TextInput>}
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
                  value={showAdvancedOptions}
                  onValueChange={setShowAdvancedOptions}
                />
              </HorizontalPadding>
            </Row>

            {showAdvancedOptions && (
              <>
                <HorizontalPadding>
                  <TextField
                    name='gasLimit'
                    label='Gas Limit'
                    placeholder='21000'
                    helperText='Required'
                    keyboardType='numeric'
                    returnKeyType='next'
                    ref={gasLimitInputRef}
                    onSubmitEditing={focusGasPrice}
                  />
                </HorizontalPadding>
                <RowWithUnit>
                  <TextField
                    name='gasPrice'
                    label='Gas Price'
                    placeholder={recommendedGasPrice}
                    helperText={gasPriceHelperText}
                    keyboardType='numeric'
                    returnKeyType='go'
                    ref={gasPriceInputRef}
                    onSubmitEditing={handleSubmit}
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
      )}
    </Formik>
  )
}

const AlignTopRow = styled(Row)`
  align-items: flex-start;
`

const RowWithUnit = styled(AlignTopRow)`
  padding-left: ${Size.MARGIN_16};
`

const SubInfoContainer = styled.View`
  width: 54;
  height: 64;
  align-items: center;
  justify-content: center;
  top: 4;
`

function RecipientBlockie() {
  const [field, meta] = useField('to')
  return (
    <SubInfoContainer>
      {meta.error || field.value === '' ? (
        <Ionicons
          name='md-contact'
          size={26}
          color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
        />
      ) : (
        <Blockie address={field.value} size={22} />
      )}
    </SubInfoContainer>
  )
}

interface IAmountTextFieldProps {
  showAdvancedOptions: boolean
  focusGasLimit: () => void
}

const AmountTextField = React.forwardRef<TextInput, IAmountTextFieldProps>(
  // eslint-disable-next-line react/prop-types
  ({showAdvancedOptions, focusGasLimit}, ref) => {
    const fiatRate = useSelector(accountSelector.getFiatRate)
    const currencyDetails = useSelector(settingSelector.getCurrencyDetails)
    const {handleSubmit} = useFormikContext()
    const [field] = useField('amount')

    const helperText = useMemo((): string => {
      if (!field.value) {
        return 'Required'
      }

      return `≈ ${new BN(field.value)
        .multipliedBy(fiatRate)
        .toFormat(currencyDetails.decimalDigits)} ${currencyDetails.code}`
    }, [fiatRate, currencyDetails, field])

    const handleSubmitEditing = useCallback((): void => {
      if (!showAdvancedOptions) {
        handleSubmit()
        return
      }
      focusGasLimit()
    }, [showAdvancedOptions, handleSubmit, focusGasLimit])

    return (
      <TextField
        name='amount'
        label='Amount'
        placeholder='3.14'
        helperText={helperText}
        keyboardType='numeric'
        returnKeyType={showAdvancedOptions ? 'next' : 'go'}
        ref={ref}
        onSubmitEditing={handleSubmitEditing}
      />
    )
  },
)

interface IGasPriceInfo {
  recommendedGasPrice: string
  helperText: string
}

const useGasPriceInfo = (): IGasPriceInfo => {
  const [gasInfo, setGasInfo] = useState<IGasInfo | null>(null)

  const recommendedGasPrice = useMemo(
    () => (gasInfo ? new BN(gasInfo.safeLow).dividedBy(10).toString() : '41'),
    [gasInfo],
  )

  const helperText = useMemo(() => {
    if (!gasInfo) {
      return 'Fetching recommendations'
    }
    const safeLow = new BN(gasInfo.safeLow).dividedBy(10).toString()
    const average = new BN(gasInfo.average).dividedBy(10).toString()
    const fast = new BN(gasInfo.fast).dividedBy(10).toString()
    return `Recommendations (\
Safe Lowest: ${safeLow} Gwei, \
Standard: ${average} Gwei, \
Fast: ${fast} Gwei)`
  }, [gasInfo])

  useEffect(() => {
    ;(async () => {
      try {
        const info = await gasStation.getGasInfo()
        setGasInfo(info)
      } catch (error) {
        // [TODO]
      }
    })()
  }, [])

  return {
    recommendedGasPrice,
    helperText,
  }
}

function Submit() {
  const {handleSubmit, isValid} = useFormikContext()
  return (
    <Button disabled={!isValid} mode='contained' onPress={handleSubmit}>
      next
    </Button>
  )
}

interface ITextFieldProps extends TextInputProps {
  name: string
  validate?: FieldValidator
  helperText?: string | ((value: string) => string)
}

const TextField = React.forwardRef(
  ({name, validate, helperText, ...textInputProps}: ITextFieldProps, ref) => {
    const [field, meta] = useField({name, validate})
    return (
      <Expanded.View>
        <TextInput
          {...textInputProps}
          // @ts-ignore
          ref={ref}
          autoCapitalize='none'
          autoCorrect={false}
          mode='outlined'
          onBlur={field.onBlur(name)}
          onChangeText={field.onChange(name)}
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
