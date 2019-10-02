import BN from 'bignumber.js'
import {Formik, FieldValidator, useFormikContext, useField} from 'formik'
import React, {useEffect, useRef, useState} from 'react'
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
import {Color} from 'src/const'
import {ISendFormValues, useWeb3} from 'src/hooks'
import {pushComfirmSend, showWalletScan} from 'src/navigation'
import {accountSelector, accountType} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'
import {gasStation} from 'src/utils'

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
  const currencyDetails = useSelector(settingSelector.getCurrencyDetails)
  const currentAccount = useSelector(
    accountSelector.getCurrentAccount,
  ) as entityType.IAccount
  const fiatRate = useSelector(accountSelector.getFiatRate)

  const [gasInfo, setGasInfo] = useState<IGasInfo | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [to, setTo] = useState('')

  const getAmountHelperText = (balance: string): string => {
    if (!balance) {
      return 'Required'
    }

    return `≈ ${new BN(balance)
      .multipliedBy(fiatRate)
      .toFormat(currencyDetails.decimalDigits)} ${currencyDetails.code}`
  }

  const getGasPrice = (): string => {
    if (!gasInfo) {
      return '41'
    }
    return new BN(gasInfo.average).dividedBy(10).toString()
  }

  const getGasPriceHelperText = (): string => {
    if (!gasInfo) {
      return ''
    }

    return `Recommendations (\
Safe Lowest: ${gasInfo.safeLow / 10} Gwei, \
Standard: ${gasInfo.average / 10} Gwei, \
Fast: ${gasInfo.fast / 10} Gwei)`
  }
  const onPressScan = (): void => {
    showWalletScan({setTo})
  }

  const onSubmit = async (values: ISendFormValues): Promise<void> => {
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
  }

  const amountInputRef = useRef<TextInput>()

  const onSubmitEditingAmount = (): void => {
    if (!amountInputRef.current) {
      return
    }
    amountInputRef.current.focus()
  }

  useEffect(() => {
    ;(async () => {
      try {
        const g = await gasStation.getGasInfo()
        setGasInfo(g)
      } catch (error) {
        // [TODO]
      }
    })()
  }, [])

  return (
    <Formik
      initialValues={{
        to,
        amount: '',
        gasLimit: '21000',
        gasPrice: getGasPrice(),
      }}
      onSubmit={() => {}}>
      {({handleSubmit, isValid}) => (
        <KeyboardAwareScrollView>
          <List.Section>
            <Row>
              <HorizontalPadding>
                <RecipientBlockie />
              </HorizontalPadding>
              <TextField
                name='to'
                label='Recipient address'
                mode='outlined'
                placeholder='0x1234...'
                helperText='Required'
                validate={value => (value === '' ? 'Required' : undefined)}
                autoFocus
                returnKeyType='next'
                onSubmitEditing={onSubmitEditingAmount}
              />
              <IconButton icon='crop-free' onPress={onPressScan} size={24} />
            </Row>

            <HorizontalPadding>
              <Row>
                <TextField
                  name='amount'
                  label='Amount'
                  placeholder='3.14'
                  helperText={getAmountHelperText}
                  keyboardType='numeric'
                  returnKeyType={showAdvancedOptions ? 'next' : 'go'}
                  ref={amountInputRef}
                />
                <HorizontalPadding>
                  <Subheading>ETH</Subheading>
                </HorizontalPadding>
              </Row>
            </HorizontalPadding>
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

            <HorizontalPadding>
              {showAdvancedOptions && (
                <>
                  <TextField
                    name='gasLimit'
                    label='Gas Limit'
                    placeholder='21000'
                    helperText='Required'
                    keyboardType='numeric'
                    returnKeyType={'next'}
                  />
                  <Row>
                    <TextField
                      name='gasPrice'
                      label='Gas Price'
                      placeholder={getGasPrice()}
                      helperText={getGasPriceHelperText()}
                      keyboardType='numeric'
                      returnKeyType={'go'}
                    />
                    <HorizontalPadding>
                      <Subheading>Gwei</Subheading>
                    </HorizontalPadding>
                  </Row>
                </>
              )}
            </HorizontalPadding>
          </List.Section>

          <Padding>
            <Submit />
          </Padding>
        </KeyboardAwareScrollView>
      )}
    </Formik>
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

function Submit() {
  const {handleSubmit, isValid} = useFormikContext()
  return (
    <Button disabled={!isValid} mode='contained' onPress={handleSubmit}>
      next
    </Button>
  )
}

function RecipientBlockie() {
  const [field, meta] = useField('to')
  return meta.error || field.value === '' ? (
    <Ionicons
      name='md-contact'
      size={24}
      color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
    />
  ) : (
    <Blockie address={field.value} size='small' />
  )
}
