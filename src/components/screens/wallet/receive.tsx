import * as React from 'react'
import { Clipboard } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useMappedState } from 'redux-react-hook'
import { Padding, QRCode } from 'src/components/atoms'
import { IState } from 'src/redux/module'
import { accountSelector } from 'src/redux/module/account'
import { entityType } from 'src/redux/module/entity'
import { uiHook } from 'src/redux/module/ui'
import styled from 'styled-components/native'

export const Receive = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      currentAccount: accountSelector.getCurrentAccount(
        state
      ) as entityType.IAccount
    }),
    []
  )
  const { currentAccount } = useMappedState(mapState)
  const { notifyAddressCopied } = uiHook.useSnackbarManager()

  const onPressCopy = React.useCallback(() => {
    Clipboard.setString(currentAccount.address)
    notifyAddressCopied()
  }, [])

  return (
    <Container>
      <Padding>
        <QRCode value={currentAccount.address} size={300} />
      </Padding>

      <Padding>
        <Text>{currentAccount.address}</Text>
      </Padding>

      <Button icon='assignment' mode='outlined' onPress={onPressCopy}>
        copy to clipboard
      </Button>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 100;
`
