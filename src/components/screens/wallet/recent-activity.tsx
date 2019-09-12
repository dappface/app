import * as React from 'react'
import {FlatList} from 'react-native'
import {ActivityIndicator, Button, Caption, Card} from 'react-native-paper'
import {useMappedState} from 'redux-react-hook'
import {Expanded, Padding} from 'src/components/atoms'
import {TxItem} from 'src/components/screens/wallet/tx-item'
import {etherscanHooks} from 'src/hooks'
import {IState} from 'src/redux/module'
import {accountSelector, accountType} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {web3Selector} from 'src/redux/module/web3'
import styled from 'styled-components/native'

export const RecentActivity = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      currentAccount: accountSelector.getCurrentAccount(
        state,
      ) as entityType.IAccount,
      latestBlockNumber: web3Selector.getLatestBlockNumber(state),
    }),
    [],
  )
  const {currentAccount, latestBlockNumber} = useMappedState(mapState)

  const [showSize, setShowSize] = React.useState(DEFAULT_SHOW_SIZE)
  const [transactions, setTransactions] = React.useState<Transactions>(
    TransactionType.Loading,
  )
  const isMaxed = transactions.length === showSize
  const fetchTransactions = etherscanHooks.useFetchTransactions()

  const onSeeMore = React.useCallback((): void => {
    const hiddenNum = transactions.length - showSize
    setShowSize(
      hiddenNum > DEFAULT_SHOW_SIZE
        ? showSize + DEFAULT_SHOW_SIZE
        : showSize + hiddenNum,
    )
  }, [showSize, transactions.length])

  const fetchTx = React.useCallback(async (): Promise<void> => {
    try {
      const res = await fetchTransactions(currentAccount)
      const {result} = res.data
      setTransactions(
        result.filter((item, i, arr) =>
          arr[i - 1] ? item.hash !== arr[i - 1].hash : true,
        ),
      )
    } catch (error) {
      setTransactions(TransactionType.FetchFailed)
    }
  }, [currentAccount, fetchTransactions])

  React.useEffect(() => {
    fetchTx()
  }, [fetchTx, latestBlockNumber])

  React.useEffect(() => {
    setShowSize(DEFAULT_SHOW_SIZE)
    setTransactions(TransactionType.Loading)
    fetchTx()
  }, [currentAccount.address, fetchTx])

  const Content = () => {
    if (transactions === TransactionType.Loading) {
      return <StyledActivityIndicator />
    }

    if (transactions === TransactionType.FetchFailed) {
      return (
        <Message>
          <Caption>Fetch failed.</Caption>
          <Button icon='refresh' mode='outlined' onPress={fetchTx}>
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
