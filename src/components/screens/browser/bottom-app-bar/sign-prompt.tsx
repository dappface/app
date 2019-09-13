import React, {useCallback} from 'react'
import {Alert, View} from 'react-native'
import {Button, Caption, Headline, Text} from 'react-native-paper'
import TouchID from 'react-native-touch-id'
import {useSelector} from 'react-redux'
import {
  Blockie,
  Padding,
  Row,
  SpaceBetweenRow,
  SpaceEvenlyRow,
  VerticalPadding,
} from 'src/components/atoms'
import {BiometryType, Size} from 'src/const'
import {useBottomAppBarManager, useBrowserManager, useWeb3} from 'src/hooks'
import {
  accountHook,
  accountSelector,
  accountType,
} from 'src/redux/module/account'
import {walletHelper} from 'src/utils'
import styled from 'styled-components/native'

export function SignPrompt() {
  const signRequest = useSelector(
    accountSelector.getSignRequest,
  ) as accountType.ISignRequest
  const setSignRerquest = accountHook.useSetSignRequest()
  const web3 = useWeb3()
  const browserManager = useBrowserManager()
  const {closeBottomAppBar} = useBottomAppBarManager()

  const gasFeeInWei = (
    parseInt(web3.utils.toWei('1', 'gwei'), 10) * 21000
  ).toString()
  const totalInWei = (
    parseInt(gasFeeInWei, 10) + parseInt(signRequest.value, 16)
  ).toString()
  const gasFeeInEther = web3.utils.fromWei(gasFeeInWei, 'ether')
  const totalInEther = web3.utils.fromWei(totalInWei, 'ether')
  const valueInEther = web3.utils.fromWei(signRequest.value, 'ether')

  const sign = useCallback(async () => {
    try {
      const biometryType = await TouchID.isSupported()
      if (
        // @ts-ignore
        ![BiometryType.FACE_ID, BiometryType.TOUCH_ID].includes(biometryType)
      ) {
        throw new Error('TouchID/FaceID does not supported')
      }
      await TouchID.authenticate('')
      browserManager.respondData(
        signRequest.tabId,
        signRequest.callbackId,
        true,
      )
      setSignRerquest()
      closeBottomAppBar()
    } catch (error) {
      if (error.name === 'LAErrorUserCancel') {
        Alert.alert('Whoops!', 'Authentication failed. Try again!')
      } else {
        Alert.alert('Whoops!', error.message)
      }
    }
  }, [
    browserManager,
    closeBottomAppBar,
    setSignRerquest,
    signRequest.callbackId,
    signRequest.tabId,
  ])

  return (
    <Container>
      <VerticalPadding>
        <Padding verticalSize={Size.MARGIN_8}>
          <Row>
            <StyledBlockie address={signRequest.from} />
            <View>
              <Caption>From:</Caption>
              <Text>{walletHelper.omitAddress(signRequest.from, 28)}</Text>
            </View>
          </Row>
        </Padding>
        <Padding verticalSize={Size.MARGIN_8}>
          <Row>
            <StyledBlockie address={signRequest.to} />
            <View>
              <Caption>To:</Caption>
              <Text>{walletHelper.omitAddress(signRequest.to, 28)}</Text>
            </View>
          </Row>
        </Padding>
      </VerticalPadding>

      <VerticalPadding>
        <Padding verticalSize={Size.MARGIN_8}>
          <SpaceBetweenRow>
            <Caption>Value:</Caption>
            <Text>{valueInEther} ETH</Text>
          </SpaceBetweenRow>
        </Padding>
        <Padding verticalSize={Size.MARGIN_8}>
          <SpaceBetweenRow>
            <Caption>Gas Fee:</Caption>
            <Text>{gasFeeInEther} ETH</Text>
          </SpaceBetweenRow>
        </Padding>
        <Padding verticalSize={Size.MARGIN_8}>
          <SpaceBetweenRow>
            <Caption>Total:</Caption>
            <Headline>{totalInEther} ETH</Headline>
          </SpaceBetweenRow>
        </Padding>
      </VerticalPadding>

      <VerticalPadding>
        <SpaceEvenlyRow>
          <Action mode='text' onPress={closeBottomAppBar}>
            cancel
          </Action>
          <Action mode='contained' onPress={sign}>
            sign
          </Action>
        </SpaceEvenlyRow>
      </VerticalPadding>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const StyledBlockie = styled(Blockie as any)`
  margin-right: ${Size.MARGIN_16};
`

const Action = styled(Button)`
  width: 132;
`
