import moment from 'moment'
import React, {useMemo} from 'react'
import {IconButton, List} from 'react-native-paper'
import {entityType} from 'src/redux/module/entity'
import styled from 'styled-components/native'

interface IItemProps {
  item: entityType.IBookmark | entityType.IHistory
  onPress: () => void
  onRemove: () => void
}

export function Item({item, onPress, onRemove}: IItemProps) {
  const description = useMemo(() => {
    const url = item.url
      .split('/')
      .slice(0, 3)
      .join('/')
    const time = moment(item.createdAt).fromNow()
    return `${time} · ${url}/`
  }, [item.createdAt, item.url])

  return (
    <StyledListItem
      title={item.title || item.url}
      description={description}
      right={({color}) => (
        <IconButton color={color} icon='close' size={24} onPress={onRemove} />
      )}
      onPress={onPress}
    />
  )
}

const StyledListItem = styled(List.Item)`
  padding-vertical: 0;
`
