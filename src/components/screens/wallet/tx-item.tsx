import moment from 'moment'
import React from 'react'
import Ripple from 'react-native-material-ripple'
import {Caption, IconButton, Subheading} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useSelector} from 'react-redux'
import {Blockie, Padding} from 'src/components/atoms'
import {Color} from 'src/const'
import {useBottomAppBarManager, useBrowserManager, useWeb3} from 'src/hooks'
import {accountSelector, accountType} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'
import {walletHelper as wHelper} from 'src/utils'
import styled from 'styled-components/native'

interface IProps {
  tx: accountType.ITransaction
}

export function TxItem({tx}: IProps) {
  const currentAccount = useSelector(
    accountSelector.getCurrentAccount,
  ) as entityType.IAccount
  const etherscanUrl = useSelector(settingSelector.getEtherscanUrl)
  const web3 = useWeb3()
  const {openLink} = useBrowserManager()
  const {closeBottomAppBar} = useBottomAppBarManager()

  const onPress = React.useCallback(() => {
    closeBottomAppBar()
    const url = `${etherscanUrl}/tx/${tx.hash}`
    openLink(url, true)
  }, [closeBottomAppBar, etherscanUrl, openLink, tx.hash])

  return (
    <Ripple onPress={onPress}>
      <Padding verticalSize={0}>
        <Row>
          <IconContainer>
            <MainIcon tx={tx} currentAccount={currentAccount} />
            {tx.from && <StyledBlockie address={tx.from} size={16} />}
          </IconContainer>

          <Info>
            <Subheading>{web3.utils.fromWei(tx.value, 'ether')} ETH</Subheading>
            <Caption numberOfLines={1} ellipsizeMode='tail'>
              {currentAccount.address.toLowerCase() === tx.from.toLowerCase()
                ? `To: ${wHelper.omitAddress(tx.to, 20)}`
                : `From: ${wHelper.omitAddress(tx.from, 20)}`}
            </Caption>

            {tx.errorMessage ? <Caption>{tx.errorMessage}</Caption> : null}

            <Caption>{moment.unix(tx.timeStamp).fromNow()}</Caption>
          </Info>

          <Arrow>
            <IconButton
              icon='open-in-new'
              size={24}
              color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
            />
          </Arrow>
        </Row>
      </Padding>
    </Ripple>
  )
}

interface IMainIconProps {
  currentAccount: entityType.IAccount
  tx: accountType.ITransaction
}

const MainIcon = ({currentAccount, tx}: IMainIconProps) => {
  if (tx.errorMessage) {
    return (
      <Icon type={TxType.Error}>
        <Ionicons
          name='ios-information'
          size={36}
          color={Color.TEXT.ERROR_HIGH_EMPHASIS}
        />
      </Icon>
    )
  }
  if (tx.to.toLowerCase() === tx.from.toLowerCase()) {
    return (
      <Icon type={TxType.Cycle}>
        <Ionicons
          name='ios-swap'
          size={24}
          color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
        />
      </Icon>
    )
  }
  if (currentAccount.address === tx.from.toLowerCase()) {
    return (
      <Icon type={TxType.From}>
        <Ionicons
          name='ios-arrow-round-up'
          size={36}
          color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
        />
      </Icon>
    )
  }
  return (
    <Icon type={TxType.To}>
      <Ionicons
        name='ios-arrow-round-down'
        size={36}
        color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
      />
    </Icon>
  )
}

const Row = styled.View`
  flex-direction: row;
  padding-vertical: 8;
  align-items: center;
`

const IconContainer = styled.View`
  width: 36;
  height: 36;
  margin-right: 8;
`

interface IIconProps {
  type: TxType
}

const Icon = styled.View<IIconProps>`
  width: 36;
  height: 36;
  border-width: 1;
  border-radius: ${40 / 2};
  align-items: center;
  justify-content: center;

  ${({type}) => {
    switch (type) {
      case TxType.From:
      case TxType.To:
        return `transform: rotate(45deg);`
      case TxType.Cycle:
        return `transform: rotate(-45deg);`
      default:
    }
  }}

  ${({type}) => {
    switch (type) {
      case TxType.Error:
        return `border-color: ${Color.TEXT.ERROR_HIGH_EMPHASIS}`
      case TxType.From:
        return `border-color: ${Color.TEXT.PRIMARY_HIGH_EMPHASIS}`
      case TxType.To:
      default:
        return `border-color: ${Color.TEXT.BLACK_MEDIUM_EMPHASIS}`
    }
  }};
`

const StyledBlockie = styled(Blockie)`
  position: absolute;
  bottom: 0;
  right: 0;
`

const Info = styled.View`
  flex: 1;
`

const Arrow = styled.View`
  width: 40;
  justify-content: center;
  align-items: center;
`

enum TxType {
  Cycle = 'cycle',
  Error = 'error',
  From = 'from',
  To = 'to',
}
