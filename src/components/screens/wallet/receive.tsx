import React, {useCallback} from 'react'
import {Clipboard} from 'react-native'
import {Button, Text} from 'react-native-paper'
import {useSelector} from 'react-redux'
import styled from 'styled-components/native'

import {Padding, QRCode} from 'src/components/atoms'
import {ModalTemplate} from 'src/components/templates'
import {accountSelector} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {uiHook} from 'src/redux/module/ui'

export function ReceiveScreen() {
  const currentAccount = useSelector(
    accountSelector.getCurrentAccount,
  ) as entityType.IAccount
  const {notifyAddressCopied} = uiHook.useSnackbarManager()

  const onPressCopy = useCallback(() => {
    Clipboard.setString(currentAccount.address)
    notifyAddressCopied()
  }, [currentAccount.address, notifyAddressCopied])

  return (
    <ModalTemplate>
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
    </ModalTemplate>
  )
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 100;
`
