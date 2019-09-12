import {ITokenCandidate} from 'lib/token-list.json'
import * as React from 'react'
import Ripple from 'react-native-material-ripple'
import {Avatar, Colors, List} from 'react-native-paper'
import Reactotron from 'reactotron-react-native'
import {useMappedState} from 'redux-react-hook'
import {HorizontalPadding} from 'src/components/atoms'
import {useTokenSearchManager} from 'src/components/screens/wallet/token-search/hooks'
import {BALANCE_OF, Size} from 'src/const'
import {useWeb3} from 'src/hooks'
import {IState} from 'src/redux/module'
import {accountSelector} from 'src/redux/module/account'
import {entityType} from 'src/redux/module/entity'
import {imageUtil} from 'src/utils'
import styled from 'styled-components/native'

interface IProps {
  item: ITokenCandidate
}

export const Item = ({item}: IProps) => {
  const web3 = useWeb3()
  const mapState = React.useCallback(
    (state: IState) => ({
      currentAccount: accountSelector.getCurrentAccount(
        state,
      ) as entityType.IAccount,
    }),
    [],
  )
  const {currentAccount} = useMappedState(mapState)
  const {onSelectFactory} = useTokenSearchManager()
  const [balance, setBalance] = React.useState('--')
  const [imageSource, setImageSource] = React.useState('')

  React.useEffect(() => {
    ;(async () => {
      const b = await web3.eth.call({
        data: BALANCE_OF + currentAccount.address.slice(2),
        to: item.address,
      })
      setBalance(parseInt(b, 8).toString())
    })()
  }, [currentAccount.address, item.address, web3.eth])

  React.useEffect(() => {
    ;(async () => {
      try {
        const url = `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${item.address}.png`
        const source = await imageUtil.fetchImageSource(url)
        setImageSource(source)
      } catch (error) {
        Reactotron.log(`Failed to fetch token image: ${error}`)
      }
    })()
  })

  return (
    <Ripple onPress={onSelectFactory(item)}>
      <HorizontalPadding>
        <List.Item
          description={`${balance} ${item.symbol}`}
          left={props =>
            imageSource ? (
              <Avatar.Image
                source={{uri: imageSource}}
                size={Size.LIST_ITEM_HEIGHT}
              />
            ) : (
              <StyledAvatarIcon
                {...props}
                color={Colors.white}
                icon='image'
                size={Size.LIST_ITEM_HEIGHT}
              />
            )
          }
          right={props => <List.Icon {...props} icon='add' />}
          title={item.name}
        />
      </HorizontalPadding>
    </Ripple>
  )
}

const StyledAvatarIcon = styled(Avatar.Icon)`
  background: ${Colors.grey400};
`
