import * as React from 'react'
import { Clipboard, View } from 'react-native'
import {
  Button,
  Caption,
  Card,
  Headline,
  IconButton,
  Subheading,
  Title
} from 'react-native-paper'
import { useMappedState } from 'redux-react-hook'
import { Blockie, Row } from 'src/components/atoms'
import { Color, Size } from 'src/const'
import { useDimensions } from 'src/hooks'
import { IState } from 'src/redux/module'
import { accountSelector } from 'src/redux/module/account'
import { entityType } from 'src/redux/module/entity'
import { uiHook } from 'src/redux/module/ui'
import { walletHelper } from 'src/utils'
import styled from 'styled-components/native'

interface IProps {
  item: entityType.IAccount
  onPressBackup: () => void
  onPressOption: () => void
  onPressReceive: () => void
  onPressSend: () => void
}

export const Item = ({
  item,
  onPressBackup,
  onPressOption,
  onPressReceive,
  onPressSend
}: IProps) => {
  const mapState = React.useCallback(
    (state: IState) => ({
      defaultAccountAddress: accountSelector.getDefaultAccountAddress(state),
      isBackedUp: accountSelector.getIsBackedUp(state)
    }),
    []
  )
  const { defaultAccountAddress, isBackedUp } = useMappedState(mapState)
  const { notifyAddressCopied } = uiHook.useSnackbarManager()

  const {
    window: { width }
  } = useDimensions()

  const onPressCopy = React.useCallback(() => {
    Clipboard.setString(item.address)
    notifyAddressCopied()
  }, [])

  return (
    <Container width={width}>
      <AccountCard onLongPress={onPressCopy}>
        <Info>
          <FirstRow>
            <View>
              <Headline>{item.balance.ether} ETH</Headline>
              <Caption>{item.balance.fiat} USD</Caption>
            </View>
            <Blockie address={item.address} />
          </FirstRow>

          <Address>
            <Caption>Your account address is</Caption>
            <Row>
              <AddressText>
                {walletHelper.omitAddress(item.address, 17)}
              </AddressText>
              <IconButton
                icon='assignment'
                color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
                onPress={onPressCopy}
              />
            </Row>
          </Address>
        </Info>

        <Card.Actions>
          {isBackedUp ? (
            <>
              <StyledButton mode='text' onPress={onPressReceive}>
                receive
              </StyledButton>
              <StyledButton mode='contained' onPress={onPressSend}>
                send
              </StyledButton>
            </>
          ) : (
            <StyledButton mode='contained' onPress={onPressBackup}>
              backup
            </StyledButton>
          )}
          <Right>
            <IconButton icon='more-vert' onPress={onPressOption} />
          </Right>
        </Card.Actions>
      </AccountCard>

      <LabelContainer>
        {item.address === defaultAccountAddress ? (
          <DefaultText>Default</DefaultText>
        ) : null}
      </LabelContainer>
    </Container>
  )
}

interface IContainerProps {
  width: number
}

const Container = styled.View<IContainerProps>`
  background: ${Color.PRIMARY};
  padding: ${Size.MARGIN_20}px;
  width: ${({ width }) => width};
`

const AccountCard = styled(Card)`
  background: ${Color.PRIMARY};
`

const Info = styled.View`
  padding-horizontal: ${Size.MARGIN_16};
  padding-top: ${Size.MARGIN_16};
`

const FirstRow = styled(Row)`
  justify-content: space-between;
`

const Address = styled.View`
  margin-bottom: ${Size.MARGIN_16};
`

const AddressText = styled(Title)`
  flex: 1;
`

const Right = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
  align-self: flex-end;
`

const LabelContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: ${Size.MARGIN_16};
`

const DefaultText = styled(Subheading)`
  color: ${Color.TEXT.BLACK_DISABLED};
`

const StyledButton = styled(Button)`
  margin-right: ${Size.MARGIN_8};
`
