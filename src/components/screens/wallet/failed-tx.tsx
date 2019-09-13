import React from 'react'
import {FlatList} from 'react-native'
import {Card} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {Padding} from 'src/components/atoms'
import {TxItem} from 'src/components/screens/wallet/tx-item'
import {accountSelector} from 'src/redux/module/account'

export function FailedTx() {
  const failedTxs = useSelector(
    accountSelector.getCurrentAccountFailedTransactions,
  )

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
            renderItem={({item}) => <TxItem tx={item} />}
          />
        </Card.Content>
      </Card>
    </Padding>
  )
}
