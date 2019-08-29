import makeBlockie from 'ethereum-blockies-base64'
import * as React from 'react'
import styled from 'styled-components/native'

type Size = number | 'small' | 'medium' | 'large' | void

interface IProps {
  style?: any
  address: string
  size?: Size
}

export const Blockie = ({ style, address, size }: IProps) => {
  return (
    <StyledImage
      style={style}
      source={{ uri: makeBlockie(address) }}
      size={size}
    />
  )
}

const getSize = ({ size }: { size: Size }): number => {
  if (typeof size === 'number') {
    return size
  } else if (size === 'small') {
    return 24
  } else if (size === 'large') {
    return 48
  } else {
    return 36
  }
}

const StyledImage = styled.Image`
  width: ${getSize};
  height: ${getSize};
  border-radius: ${props => getSize(props) / 2};
`
