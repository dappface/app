import React, {useEffect, useState} from 'react'
import {Avatar, Colors, IconButton, List} from 'react-native-paper'
import Reactotron from 'reactotron-react-native'
import {HorizontalPadding} from 'src/components/atoms'
import {Size} from 'src/const'
import {entityType} from 'src/redux/module/entity'
import {imageUtil} from 'src/utils'
import styled from 'styled-components/native'

export interface IProps {
  item: entityType.IToken
  onPressMoreFactory: (token: entityType.IToken) => () => void
}

export function Item({item, onPressMoreFactory}: IProps) {
  const [imageSource, setImageSource] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const url = `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${item.address}.png`
        const source = await imageUtil.fetchImageSource(url)
        setImageSource(source)
      } catch (error) {
        Reactotron.log(`Failed to fetch token image: ${error}`)
      }
    })()
  }, [item.address])

  return (
    <HorizontalPadding>
      <List.Item
        description={item.name}
        left={() =>
          imageSource ? (
            <Avatar.Image
              source={{uri: imageSource}}
              size={Size.LIST_ITEM_HEIGHT}
            />
          ) : (
            <StyledAvatarIcon
              color={Colors.white}
              icon='image'
              size={Size.LIST_ITEM_HEIGHT}
            />
          )
        }
        right={({color}) => (
          <IconButton
            color={color}
            icon='more-vert'
            onPress={onPressMoreFactory(item)}
          />
        )}
        title={`${item.balance} ${item.symbol}`}
      />
    </HorizontalPadding>
  )
}

const StyledAvatarIcon = styled(Avatar.Icon)`
  background: ${Colors.grey400};
`
