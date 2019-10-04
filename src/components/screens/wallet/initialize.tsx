import {useNavigation} from '@react-navigation/core'
import React, {useCallback} from 'react'
import {Alert} from 'react-native'
import {Button, Headline} from 'react-native-paper'
import TouchID from 'react-native-touch-id'
import styled from 'styled-components/native'

import {CenteredColumn, HorizontalPadding} from 'src/components/atoms'
import {BiometryType, ScreenName, Size} from 'src/const'
import {accountHook} from 'src/redux/module/account'

export function Initialize() {
  const {createAccount} = accountHook.useAccountManager()
  const navigation = useNavigation()

  const onPressCreate = useCallback(async () => {
    try {
      const biometryType = await TouchID.isSupported()
      if (
        // @ts-ignore
        ![BiometryType.FACE_ID, BiometryType.TOUCH_ID].includes(biometryType)
      ) {
        throw new Error('TouchID/FaceID does not supported')
      }
      await TouchID.authenticate('')
      createAccount()
    } catch (error) {
      switch (error.name) {
        case 'LAErrorUserCancel':
          Alert.alert('Whoops!', 'Authentication failed. Try again!')
          break
        case 'LAErrorTouchIDNotEnrolled':
          Alert.alert('Whoops!', 'Enable TouchID or FaceID and try again!')
          break
        default:
          Alert.alert('Whoops!', 'Something went wrong. Try again later')
          break
      }
    }
  }, [createAccount])

  const onPressImport = useCallback(() => {
    navigation.navigate(ScreenName.WalletImportStackNavigation)
  }, [navigation])

  return (
    <Container>
      <HorizontalPadding>
        <TitleUnderline>
          <Headline>Sign in to Web3</Headline>
        </TitleUnderline>
      </HorizontalPadding>

      <HorizontalPadding>
        <CenteredColumn>
          <StyledButton mode='contained' onPress={onPressCreate}>
            Create Account
          </StyledButton>
          <StyledButton mode='text' onPress={onPressImport}>
            Import Accounts
          </StyledButton>
        </CenteredColumn>
      </HorizontalPadding>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const TitleUnderline = styled.View`
  margin-top: ${Size.MARGIN_16};
  border-bottom-width: 2;
  padding-bottom: ${Size.MARGIN_16};
  margin-vertical: ${Size.MARGIN_16};
`

const StyledButton = styled(Button)`
  width: 200;
  margin-vertical: ${Size.MARGIN_8};
`
