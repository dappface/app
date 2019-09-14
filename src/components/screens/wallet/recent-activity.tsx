import React, {useCallback, useEffect, useState} from 'react'
import {FlatList} from 'react-native'
import {useSelector} from 'react-redux'
import {ActivityIndicator, Button, Caption, Card} from 'react-native-paper'
import {Expanded, Padding} from 'src/components/atoms'
import {TxItem} from 'src/components/screens/wallet/tx-item'
import {etherscanHooks} from 'src/hooks'
import {accountSelector, accountType} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'
import {web3Selector} from 'src/redux/module/web3'
import styled from 'styled-components/native'

export function RecentActivity() {
  const currentAccount = useSelector(
    accountSelector.getCurrentAccount,
  ) as entityType.IAccount
  const latestBlockNumber = useSelector(web3Selector.getLatestBlockNumber)
  const networkId = useSelector(settingSelector.getNetwork)

  const [showSize, setShowSize] = useState(DEFAULT_SHOW_SIZE)
  const [transactions, setTransactions] = useState<Transactions>(
    TransactionType.Loading,
  )
  const isMaxed = transactions.length === showSize
  const fetchTransactions = etherscanHooks.useFetchTransactions()

  const onSeeMore = useCallback((): void => {
    const hiddenNum = transactions.length - showSize
    setShowSize(
      hiddenNum > DEFAULT_SHOW_SIZE
        ? showSize + DEFAULT_SHOW_SIZE
        : showSize + hiddenNum,
    )
  }, [showSize, transactions.length])

  const updateTx = useCallback(async (): Promise<void> => {
    try {
      const res = await fetchTransactions(currentAccount)
      setTransactions(
        res.data.result
          .filter((item, i, arr) =>
            arr[i - 1] ? item.hash !== arr[i - 1].hash : true,
          )
          .map(item => ({
            address: currentAccount.address,
            chainId: networkId,
            from: item.from,
            gasPrice: item.gasPrice,
            hash: item.hash,
            nonce: parseInt(item.nonce, 10),
            timeStamp: parseInt(item.timeStamp, 10),
            to: item.to,
            value: item.value,
          })),
      )
    } catch (error) {
      setTransactions(TransactionType.FetchFailed)
    }
  }, [currentAccount.address, fetchTransactions, networkId])

  useEffect(() => {
    setShowSize(DEFAULT_SHOW_SIZE)
    setTransactions(TransactionType.Loading)
  }, [currentAccount.address])

  useEffect(() => {
    updateTx()
  }, [currentAccount.address, latestBlockNumber, updateTx])

  const Content = () => {
    if (transactions === TransactionType.Loading) {
      return <StyledActivityIndicator />
    }

    if (transactions === TransactionType.FetchFailed) {
      return (
        <Message>
          <Caption>Fetch failed.</Caption>
          <Button icon='refresh' mode='outlined' onPress={updateTx}>
            retry
          </Button>
        </Message>
      )
    }

    if (transactions.length === 0) {
      return (
        <Message>
          <Caption>No Activity</Caption>
        </Message>
      )
    }

    return (
      <FlatList
        data={transactions.slice(0, showSize)}
        keyExtractor={(item, i) => `${item.hash}:${i}`}
        renderItem={({item}) => <TxItem tx={item} />}
      />
    )
  }

  return (
    <Padding>
      <Card>
        <Card.Title title='RECENT ACTIVITY' />
        <Content />
        {typeof transactions !== 'string' &&
        transactions.length > 0 &&
        !isMaxed ? (
          <Card.Actions>
            <Expanded.View>
              <Button mode='text' onPress={onSeeMore}>
                see more
              </Button>
            </Expanded.View>
          </Card.Actions>
        ) : null}
      </Card>
    </Padding>
  )
}

const DEFAULT_SHOW_SIZE = 3

const StyledActivityIndicator = styled(ActivityIndicator)`
  height: 120;
`

const Message = styled.View`
  height: 120;
  align-items: center;
  justify-content: center;
`

enum TransactionType {
  FetchFailed = 'fetchFailed',
  Loading = 'loading',
}

type Transactions = TransactionType | accountType.ITransaction[]
