import BN from 'bignumber.js'
import React, {useCallback, useMemo} from 'react'
import {Alert} from 'react-native'
import {Button, Text} from 'react-native-paper'
import TouchID from 'react-native-touch-id'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'
import {useSelector} from 'react-redux'

import {Blockie} from 'src/components/atoms'
import {ModalTemplate} from 'src/components/templates'
import {IScreenProps} from 'src/components/screens/shared'
import {BiometryType, ScreenName, Size} from 'src/const'
import {useWeb3} from 'src/hooks'
import {
  accountHook,
  accountSelector,
  accountType,
} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'
import {walletHelper as wHelper} from 'src/utils'

export function ConfirmScreen({
  navigation,
  route,
}: IScreenProps<{txParams: accountType.ITransactionParams}>) {
  const web3 = useWeb3()
  const currencyDetails = useSelector(settingSelector.getCurrencyDetails)
  const currentAccount = useSelector(
    accountSelector.getCurrentAccount,
  ) as entityType.IAccount
  const fiatRate = useSelector(accountSelector.getFiatRate)
  const signAndSendTx = accountHook.useSignAndSendTransaction()

  const onPressSend = useCallback(async () => {
    try {
      const biometryType = await TouchID.isSupported()
      if (
        // @ts-ignore
        ![BiometryType.FACE_ID, BiometryType.TOUCH_ID].includes(biometryType)
      ) {
        throw new Error('TouchID/FaceID does not supported')
      }
      await TouchID.authenticate('')
      await signAndSendTx(currentAccount, route.params.txParams)
      navigation.navigate(ScreenName.BrowserScreen)
      Alert.alert('Transaction has been successfully broadcasted!')
    } catch (error) {
      if (error.name === 'LAErrorUserCancel') {
        Alert.alert('Whoops!', 'Authentication failed. Try again!')
      } else {
        Alert.alert('Whoops!', error.message)
      }
    }
  }, [navigation, route, currentAccount, signAndSendTx])

  const ether = useMemo(
    () => web3.utils.fromWei(route.params.txParams.value, 'ether'),
    [route, web3.utils],
  )

  const maxGas = useMemo(
    () =>
      new BN(route.params.txParams.gasLimit).multipliedBy(
        route.params.txParams.gasLimit,
      ),
    [route],
  )

  const maxTotal = useMemo(
    () =>
      web3.utils.fromWei(
        new BN(route.params.txParams.value).plus(maxGas).toString(),
        'ether',
      ),
    [maxGas, route, web3.utils],
  )

  const fiat = useMemo(
    () =>
      new BN(fiatRate)
        .multipliedBy(ether)
        .toFormat(currencyDetails.decimalDigits),
    [currencyDetails, ether, fiatRate],
  )

  return (
    <ModalTemplate text='cancel'>
      <Container>
        <Header>
          <Title>
            <Text>Send Transaction</Text>
          </Title>

          <FromTo>
            <AccountInfo>
              <Blockie address={currentAccount.address} />
              <Text>{wHelper.omitAddress(currentAccount.address)}</Text>
            </AccountInfo>

            <Relation>
              <Text>{ether} ETH</Text>
              <Text>
                {fiat} {currencyDetails.code}
              </Text>
              <Ionicons name='ios-arrow-round-forward' size={24} />
            </Relation>

            <AccountInfo>
              <Blockie address={route.params.txParams.to} />
              <Text>{wHelper.omitAddress(route.params.txParams.to)}</Text>
            </AccountInfo>
          </FromTo>
        </Header>

        <Detail>
          <DetailItem>
            <Text>Gas Price</Text>
            <Text>
              {web3.utils.fromWei(route.params.txParams.gasPrice, 'Gwei')} GWEI
            </Text>
          </DetailItem>

          <DetailItem>
            <Text>Gas Limit</Text>
            <Text>{route.params.txParams.gasLimit} UNITS</Text>
          </DetailItem>

          <DetailItem>
            <Text>Max Transaction Fee</Text>
            <Text>{web3.utils.fromWei(maxGas.toString(), 'ether')} ETH</Text>
          </DetailItem>

          <DetailItem>
            <Text>Max Total</Text>
            <Text>{maxTotal} ETH</Text>
          </DetailItem>
        </Detail>

        <Button mode='contained' onPress={onPressSend}>
          send
        </Button>
      </Container>
    </ModalTemplate>
  )
}

const Container = styled.View`
  flex: 1;
  padding-horizontal: ${Size.MARGIN_16};
`

const Header = styled.View`
  align-items: center;
  padding: 10px;
`

const Title = styled.View`
  padding: 20px 0;
`

const FromTo = styled.View`
  flex-direction: row;
`

const AccountInfo = styled.View`
  align-items: center;
`

const Relation = styled.View`
  align-items: center;
  justify-content: center;
`

const Detail = styled.View`
  padding: 10px;
`

const DetailItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
`
