import * as React from 'react'
import Ripple from 'react-native-material-ripple'
import {Checkbox, List} from 'react-native-paper'
import {Blockie, HorizontalPadding} from 'src/components/atoms'
import {useWeb3} from 'src/hooks'
import {accountType} from 'src/redux/module/account'
import {walletHelper as wHelper} from 'src/utils'

interface IProps {
  i: number
  account: accountType.IAccountCandidate
  onPress: () => void
}

export const Item = ({account, onPress}: IProps) => {
  const web3 = useWeb3()
  const [balance, setBalance] = React.useState('--')

  React.useEffect(() => {
    ;(async () => {
      const wei = await web3.eth.getBalance(account.address)
      const ether = web3.utils.fromWei(wei, 'ether')
      setBalance(ether)
    })()
  }, [account.address, web3.eth, web3.utils])

  return (
    <Ripple onPress={onPress}>
      <HorizontalPadding>
        <List.Item
          title={wHelper.omitAddress(account.address)}
          description={`${balance} ETH`}
          left={() => <Blockie address={account.address} size={32} />}
          right={() => (
            <Checkbox.Android
              status={account.isSelected ? 'checked' : 'unchecked'}
            />
          )}
        />
      </HorizontalPadding>
    </Ripple>
  )
}
