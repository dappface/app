import * as React from 'react'
import { FlatList } from 'react-native'
import { Card } from 'react-native-paper'
import { useMappedState } from 'redux-react-hook'
import { Padding } from 'src/components/atoms'
import { TxItem } from 'src/components/screens/wallet/tx-item'
import { IState } from 'src/redux/module'
import { accountSelector } from 'src/redux/module/account'

export const FailedTx = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      failedTxs: accountSelector.getCurrentAccountFailedTransactions(state)
    }),
    []
  )
  const { failedTxs } = useMappedState(mapState)

  if (failedTxs.length === 0) {
    return null
  }

  return (
    <Padding>
      <Card>
        <Card.Title title='FAILED TRANSACTIONS' />
        <Card.Content>
          <FlatList
            data={failedTxs}
            keyExtractor={item => item.hash}
            renderItem={({ item }) => <TxItem tx={item} />}
          />
        </Card.Content>
      </Card>
    </Padding>
  )
}
