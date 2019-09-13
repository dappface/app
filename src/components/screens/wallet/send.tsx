import BN from 'bignumber.js'
import * as React from 'react'
import {Field, Form} from 'react-final-form'
import {View} from 'react-native'
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
import {useMappedState} from 'redux-react-hook'
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
import {IState} from 'src/redux/module'
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

export const Send = ({componentId}: IProps) => {
  const web3 = useWeb3()
  const mapState = React.useCallback(
    (state: IState) => ({
      currencyDetails: settingSelector.getCurrencyDetails(state),
      currentAccount: accountSelector.getCurrentAccount(
        state,
      ) as entityType.IAccount,
      fiatRate: accountSelector.getFiatRate(state),
    }),
    [],
  )
  const {currencyDetails, currentAccount, fiatRate} = useMappedState(mapState)
  const {
    addressValidator,
    amountValidatorFactory,
    gasPriceValidator,
    required,
  } = useValidators()

  const [gasInfo, setGasInfo] = React.useState<IGasInfo | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = React.useState(false)
  const [to, setTo] = React.useState('')

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

  const amountInputRef = React.useRef<TextInput>(null)

  const onSubmitEditingAmount = (): void => {
    if (!amountInputRef.current) {
      return
    }
    amountInputRef.current.focus()
  }

  React.useEffect(() => {
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
    <Expanded.View>
      <Expanded.ScrollView keyboardShouldPersistTaps='never'>
        <Form
          onSubmit={onSubmit as any}
          initialValues={{
            gasLimit: '21000',
            gasPrice: getGasPrice(),
            to,
          }}
          // @ts-ignore
          render={({handleSubmit, pristine, submitting, invalid}) => (
            <View>
              <List.Section>
                <Field
                  name='to'
                  validate={addressValidator}
                  render={({input, meta}) => (
                    <Row>
                      <HorizontalPadding>
                        {!(addressValidator as any)(input.value) ? (
                          <Blockie address={input.value} size='small' />
                        ) : (
                          <Ionicons
                            name='md-contact'
                            size={24}
                            color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
                          />
                        )}
                      </HorizontalPadding>
                      <Expanded.View>
                        <TextInput
                          {...(input as any)}
                          autoCapitalize='none'
                          autoCorrect={false}
                          label='Recipient address'
                          mode='outlined'
                          placeholder='0x1234...'
                        />
                        {meta.touched && meta.error ? (
                          <HelperText type='error'>{meta.error}</HelperText>
                        ) : (
                          <HelperText>Required</HelperText>
                        )}
                      </Expanded.View>
                      <IconButton
                        icon='crop-free'
                        onPress={onPressScan}
                        size={24}
                      />
                    </Row>
                  )}
                />

                <HorizontalPadding>
                  <Field
                    name='amount'
                    onSubmitEditing={onSubmitEditingAmount}
                    validate={amountValidatorFactory(currentAccount)}
                    render={({input, meta}) => (
                      <Row>
                        <Expanded.View>
                          <TextInput
                            {...(input as any)}
                            autoCapitalize='none'
                            autoCorrect={false}
                            label='Amount'
                            mode='outlined'
                            placeholder='3.14'
                            keyboardType='numeric'
                            ref={amountInputRef}
                          />
                          {meta.touched && meta.error ? (
                            <HelperText type='error'>{meta.error}</HelperText>
                          ) : (
                            <HelperText>
                              {getAmountHelperText(input.value)}
                            </HelperText>
                          )}
                        </Expanded.View>
                        <HorizontalPadding>
                          <Subheading>ETH</Subheading>
                        </HorizontalPadding>
                      </Row>
                    )}
                  />
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
                    <View>
                      <Field
                        name='gasLimit'
                        validate={required}
                        render={({input, meta}) => (
                          <>
                            <TextInput
                              {...(input as any)}
                              autoCapitalize='none'
                              autoCorrect={false}
                              label='Gas Limit'
                              mode='outlined'
                              placeholder='21000'
                              keyboardType='numeric'
                            />
                            {meta.touched && meta.error ? (
                              <HelperText type='error'>{meta.error}</HelperText>
                            ) : (
                              <HelperText>Required</HelperText>
                            )}
                          </>
                        )}
                      />
                      <Field
                        name='gasPrice'
                        validate={gasPriceValidator}
                        render={({input, meta}) => (
                          <Row>
                            <Expanded.View>
                              <TextInput
                                {...(input as any)}
                                autoCapitalize='none'
                                autoCorrect={false}
                                label='Gas Price'
                                mode='outlined'
                                placeholder={getGasPrice()}
                                keyboardType='numeric'
                              />
                              {meta.touched && meta.error ? (
                                <HelperText type='error'>
                                  {meta.error}
                                </HelperText>
                              ) : (
                                <HelperText>
                                  {getGasPriceHelperText()}
                                </HelperText>
                              )}
                            </Expanded.View>
                            <HorizontalPadding>
                              <Subheading>Gwei</Subheading>
                            </HorizontalPadding>
                          </Row>
                        )}
                      />
                    </View>
                  )}
                </HorizontalPadding>
              </List.Section>

              <Padding>
                <Button
                  disabled={pristine || invalid || submitting}
                  mode='contained'
                  onPress={handleSubmit as any}>
                  next
                </Button>
              </Padding>
            </View>
          )}
        />
      </Expanded.ScrollView>
    </Expanded.View>
  )
}
