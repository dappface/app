import {
  PostMessageActions,
  PostMessageActionType
} from 'dappface-inpage-provider'
import sigUtil from 'eth-sig-util'
import Tx from 'ethereumjs-tx'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { WebViewSharedProps } from 'react-native-webview/lib/WebViewTypes'
import { useMappedState } from 'redux-react-hook'
import { useBottomAppBarManager } from 'src/hooks/bottom-app-bar'
import { useBrowserManager } from 'src/hooks/browser/browser-manager'
import { useWeb3 } from 'src/hooks/web3'
import { IState } from 'src/redux/module'
import { accountHook, accountSelector } from 'src/redux/module/account'
import { entityType } from 'src/redux/module/entity'
import { historyHook } from 'src/redux/module/history'
import { settingSelector } from 'src/redux/module/setting'
import { httpClient } from 'src/utils'

interface IMessageChannelManager {
  onMessage: WebViewSharedProps['onMessage']
}

export const useMessageChannelManager = (
  tabId: string
): IMessageChannelManager => {
  const mapState = useCallback(
    (state: IState) => ({
      accounts: accountSelector.getAccounts(state),
      addresses: accountSelector.getDefaultAccountAddresses(state),
      network: settingSelector.getNetwork(state)
    }),
    []
  )
  const { accounts, addresses, network } = useMappedState(mapState)
  const { openLink, respondData } = useBrowserManager()
  const { addHistory } = historyHook.useHistoryManager()
  const setSignRequest = accountHook.useSetSignRequest()
  const { openBottomAppBar } = useBottomAppBarManager()
  const web3 = useWeb3()

  const onMessage: IMessageChannelManager['onMessage'] = async ({
    nativeEvent
  }) => {
    const data: PostMessageActions = JSON.parse(nativeEvent.data)
    switch (data.type) {
      case PostMessageActionType.OpenTargetBlankLink:
        openLink(data.payload.uri, true)
        break
      case PostMessageActionType.PushState:
        const res = await httpClient.get(data.payload.url)
        const title = res.data.split('<title>')[1].split('</title>')[0]
        addHistory(tabId, title, data.payload.url)
        break
      case PostMessageActionType.ApprovePersonalMessage:
        Alert.alert(
          'Signature Request',
          `Account Address: ${
            data.payload.msgParams.from
          }, Message: ${web3.utils.hexToUtf8(data.payload.msgParams.data)}`,
          [
            {
              onPress: () => {
                respondData(tabId, data.payload.callbackId, false)
              },
              text: 'CANCEL'
            },
            {
              onPress: () => {
                respondData(tabId, data.payload.callbackId, true)
              },
              text: 'SIGN'
            }
          ]
        )
        break
      case PostMessageActionType.ApproveTransaction:
        setSignRequest({
          callbackId: data.payload.callbackId,
          from: data.payload.txParams.from,
          tabId,
          to: data.payload.txParams.to,
          value: data.payload.txParams.value
        })
        openBottomAppBar()
        break
      case PostMessageActionType.GetAccounts:
        respondData(tabId, data.payload.callbackId, addresses)
        break
      case PostMessageActionType.SignPersonalMessage: {
        const a = accounts.find(
          item => item.address === data.payload.msgParams.from
        ) as entityType.IAccount
        const privateKey = Buffer.from(a.privKey, 'hex')
        const sign = sigUtil.personalSign(privateKey, data.payload.msgParams)
        respondData(tabId, data.payload.callbackId, sign)
        break
      }
      case PostMessageActionType.SignTransaction: {
        const a = accounts.find(
          item => item.address === data.payload.txParams.from
        ) as entityType.IAccount
        const rawTx = {
          chainId: network,
          gasLimit: data.payload.txParams.gas,
          gasPrice: data.payload.txParams.gasPrice,
          nonce: data.payload.txParams.nonce,
          to: data.payload.txParams.to,
          value: data.payload.txParams.value
        }
        const tx = new Tx(rawTx)
        const privateKey = Buffer.from(a.privKey, 'hex')
        tx.sign(privateKey)
        const sign = '0x' + tx.serialize().toString('hex')
        respondData(tabId, data.payload.callbackId, sign)
        break
      }
      default:
        break
    }
  }

  return { onMessage }
}
