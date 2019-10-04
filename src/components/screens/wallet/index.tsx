import React from 'react'
import {Caption} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {AccountList} from 'src/components/screens/wallet/account-list'
import {FailedTx} from 'src/components/screens/wallet/failed-tx'
import {Initialize} from 'src/components/screens/wallet/initialize'
import {RecentActivity} from 'src/components/screens/wallet/recent-activity'
import {TokenList} from 'src/components/screens/wallet/token-list'
import {Color, Size} from 'src/const'
import {useBottomAppBarHeight} from 'src/hooks'
import {accountSelector} from 'src/redux/module/account'
import {settingSelector} from 'src/redux/module/setting'
import {web3Selector} from 'src/redux/module/web3'
import styled from 'styled-components/native'

export {Confirm} from 'src/components/screens/wallet/confirm'
export {AccountSelector, Import} from 'src/components/screens/wallet/import'
export {Receive} from 'src/components/screens/wallet/receive'
export {Scan} from 'src/components/screens/wallet/scan'
export {Send} from 'src/components/screens/wallet/send'
export {TokenSearch} from 'src/components/screens/wallet/token-search'

interface IProps {
  componentId: string
}

export function Wallet({componentId}: IProps) {
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
            <AccountList componentId={componentId} />
            <FailedTx />
            <RecentActivity />
            <TokenList componentId={componentId} />
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
