import makeBlockie from 'ethereum-blockies-base64'
import React from 'react'
import styled from 'styled-components/native'

type Size = number | 'small' | 'medium' | 'large' | void

interface IProps {
  style?: any
  address: string
  size?: Size
}

export function Blockie({style, address, size}: IProps) {
  return (
    <StyledImage
      style={style}
      source={{uri: makeBlockie(address)}}
      size={size}
    />
  )
}

function getSize({size}: {size: Size}): number {
  if (typeof size === 'number') {
    return size
  }
  if (size === 'small') {
    return 24
  }
  if (size === 'large') {
    return 48
  }
  return 36
}

const StyledImage = styled.Image`
  width: ${getSize};
  height: ${getSize};
  border-radius: ${props => getSize(props) / 2};
`
