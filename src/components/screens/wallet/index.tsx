import React from 'react'
import {Caption} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {AccountList} from './account-list'
import {FailedTx} from './failed-tx'
import {Initialize} from './initialize'
import {RecentActivity} from './recent-activity'
import {TokenList} from './token-list'
import {Color, Size} from 'src/const'
import {useBottomAppBarHeight} from 'src/hooks'
import {accountSelector} from 'src/redux/module/account'
import {settingSelector} from 'src/redux/module/setting'
import {web3Selector} from 'src/redux/module/web3'
import styled from 'styled-components/native'

export * from './confirm'
export * from './import'
export * from './receive'
export * from './scan'
export * from './send'
export * from './token-search'

export function Wallet() {
  const bottomAppBarHeight = useBottomAppBarHeight()
  const isAccountExist = useSelector(accountSelector.getIsAccountExist)
  const latestBlockNumber = useSelector(web3Selector.getLatestBlockNumber)
  const networkName = useSelector(settingSelector.getNetworkName)

  return (
    <Container>
      <StyledScrollView
        contentContainerStyle={{paddingBottom: bottomAppBarHeight}}>
        <NetworkStatus>
          <Caption>{networkName}</Caption>
          <Caption>Latest Block: #{latestBlockNumber}</Caption>
        </NetworkStatus>

        {isAccountExist ? (
          <>
            <AccountList />
            <FailedTx />
            <RecentActivity />
            <TokenList />
          </>
        ) : (
          <Initialize />
        )}
      </StyledScrollView>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background: ${Color.PRIMARY};
`

const NetworkStatus = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: ${Size.MARGIN_16};
`

const StyledScrollView = styled.ScrollView`
  flex: 1;
`
