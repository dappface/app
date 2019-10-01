import BN from 'bignumber.js'
import {Formik} from 'formik'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Field, Form} from 'react-final-form'
import {View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  HelperText,
  IconButton,
  List,
  Subheading,
  Switch,
  TextInput,
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
import {ISendFormValues, useValidators, useWeb3} from 'src/hooks'
import {pushComfirmSend, showWalletScan} from 'src/navigation'
import {accountSelector, accountType} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'
import {gasStation} from 'src/utils'
import * as yup from 'yup'

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
  // const {
  //   addressValidator,
  //   amountValidatorFactory,
  //   gasPriceValidator,
  //   required,
  // } = useValidators()

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

  const validationSchema = useMemo(
    () =>
      yup.object({
        to: yup
          .string()
          .required()
          .test('address', 'Invalid address', value =>
            web3.utils.isAddress(value.trim()),
          ),
        amount: yup
          .string()
          .required()
          .test('positive-string-number', 'Must be positive number', value =>
            new BN(value).isGreaterThan(0),
          )
          .test('less-than-balance', 'Insufficient funds', value => {
            const balance = new BN(currentAccount.balance.wei)
            const amount = web3.utils.toWei(value, 'ether')
            const gasPrice = new BN(
              web3.utils.toWei(this.options.context.gasPrice, 'Gwei'),
            )
            const maxGas = gasPrice.multipliedBy(this.options.context.gasLimit)
            const maxTotal = maxGas.plus(amount.toString())
            return balance.isLessThan(maxTotal)
          }),
      }),
    [web3, currentAccount],
  )

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

  const amountInputRef = useRef<TextInput>(null)

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
      initialValues={{to: '', amount: ''}}
      onSubmit={() => {}}
      validationSchema={validationSchema}>
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        isValidating,
        touched,
        values,
      }) => (
        <KeyboardAwareScrollView>
          <List.Section>
            <Row>
              <HorizontalPadding>
                {!touched.to || errors.to ? (
                  <Ionicons
                    name='md-contact'
                    size={24}
                    color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
                  />
                ) : (
                  <Blockie address={values.to} size='small' />
                )}
              </HorizontalPadding>
              <Expanded.View>
                <TextInput
                  onBlur={handleBlur('to')}
                  onChangeText={handleChange('to')}
                  autoCapitalize='none'
                  autoCorrect={false}
                  label='Recipient address'
                  mode='outlined'
                  placeholder='0x1234...'
                  value={values.to === null ? '' : values.to}
                />
                {touched.to && errors.to ? (
                  <HelperText type='error'>{errors.to}</HelperText>
                ) : (
                  <HelperText>Required</HelperText>
                )}
              </Expanded.View>
              <IconButton icon='crop-free' onPress={onPressScan} size={24} />
            </Row>

            <HorizontalPadding>
              <Row>
                <Expanded.View>
                  <TextInput
                    onBlur={handleBlur('amount')}
                    onChangeText={handleChange('amount')}
                    autoCapitalize='none'
                    autoCorrect={false}
                    label='Amount'
                    mode='outlined'
                    placeholder='3.14'
                    keyboardType='numeric'
                    ref={amountInputRef}
                    value={values.amount}
                  />
                  {touched.amount && errors.amount ? (
                    <HelperText type='error'>{errors.amount}</HelperText>
                  ) : (
                    <HelperText>
                      {getAmountHelperText(values.amount)}
                    </HelperText>
                  )}
                </Expanded.View>
                <HorizontalPadding>
                  <Subheading>ETH</Subheading>
                </HorizontalPadding>
              </Row>
            </HorizontalPadding>
          </List.Section>
        </KeyboardAwareScrollView>
      )}
    </Formik>
    // <Expanded.View>
    //   <Expanded.ScrollView keyboardShouldPersistTaps='never'>
    //     <Form
    //       onSubmit={onSubmit as any}
    //       initialValues={{
    //         gasLimit: '21000',
    //         gasPrice: getGasPrice(),
    //         to,
    //       }}
    //       // @ts-ignore
    //       render={({handleSubmit, pristine, submitting, invalid}) => (
    //         <View>
    //           <List.Section>
    //             <HorizontalPadding>
    //               <Field
    //                 name='amount'
    //                 onSubmitEditing={onSubmitEditingAmount}
    //                 validate={amountValidatorFactory(currentAccount)}
    //                 render={({input, meta}) => (
    //                   <Row>
    //                     <Expanded.View>
    //                       <TextInput
    //                         {...(input as any)}
    //                         autoCapitalize='none'
    //                         autoCorrect={false}
    //                         label='Amount'
    //                         mode='outlined'
    //                         placeholder='3.14'
    //                         keyboardType='numeric'
    //                         ref={amountInputRef}
    //                       />
    //                       {meta.touched && meta.error ? (
    //                         <HelperText type='error'>{meta.error}</HelperText>
    //                       ) : (
    //                         <HelperText>
    //                           {getAmountHelperText(input.value)}
    //                         </HelperText>
    //                       )}
    //                     </Expanded.View>
    //                     <HorizontalPadding>
    //                       <Subheading>ETH</Subheading>
    //                     </HorizontalPadding>
    //                   </Row>
    //                 )}
    //               />
    //             </HorizontalPadding>
    //           </List.Section>

    //           <List.Section>
    //             <Row>
    //               <Expanded.View>
    //                 <List.Subheader>Advanced Options</List.Subheader>
    //               </Expanded.View>
    //               <HorizontalPadding>
    //                 <Switch
    //                   value={showAdvancedOptions}
    //                   onValueChange={setShowAdvancedOptions}
    //                 />
    //               </HorizontalPadding>
    //             </Row>
    //             <HorizontalPadding>
    //               {showAdvancedOptions && (
    //                 <View>
    //                   <Field
    //                     name='gasLimit'
    //                     validate={required}
    //                     render={({input, meta}) => (
    //                       <>
    //                         <TextInput
    //                           {...(input as any)}
    //                           autoCapitalize='none'
    //                           autoCorrect={false}
    //                           label='Gas Limit'
    //                           mode='outlined'
    //                           placeholder='21000'
    //                           keyboardType='numeric'
    //                         />
    //                         {meta.touched && meta.error ? (
    //                           <HelperText type='error'>{meta.error}</HelperText>
    //                         ) : (
    //                           <HelperText>Required</HelperText>
    //                         )}
    //                       </>
    //                     )}
    //                   />
    //                   <Field
    //                     name='gasPrice'
    //                     validate={gasPriceValidator}
    //                     render={({input, meta}) => (
    //                       <Row>
    //                         <Expanded.View>
    //                           <TextInput
    //                             {...(input as any)}
    //                             autoCapitalize='none'
    //                             autoCorrect={false}
    //                             label='Gas Price'
    //                             mode='outlined'
    //                             placeholder={getGasPrice()}
    //                             keyboardType='numeric'
    //                           />
    //                           {meta.touched && meta.error ? (
    //                             <HelperText type='error'>
    //                               {meta.error}
    //                             </HelperText>
    //                           ) : (
    //                             <HelperText>
    //                               {getGasPriceHelperText()}
    //                             </HelperText>
    //                           )}
    //                         </Expanded.View>
    //                         <HorizontalPadding>
    //                           <Subheading>Gwei</Subheading>
    //                         </HorizontalPadding>
    //                       </Row>
    //                     )}
    //                   />
    //                 </View>
    //               )}
    //             </HorizontalPadding>
    //           </List.Section>

    //           <Padding>
    //             <Button
    //               disabled={pristine || invalid || submitting}
    //               mode='contained'
    //               onPress={handleSubmit as any}>
    //               next
    //             </Button>
    //           </Padding>
    //         </View>
    //       )}
    //     />
    //   </Expanded.ScrollView>
    // </Expanded.View>
  )
}
