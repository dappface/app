import {Size} from 'src/const'
import styled from 'styled-components/native'

interface IProps {
  horizontalSize?: number
  verticalSize?: number
  size?: number
}

export const Padding = styled.View<IProps>`
  margin-horizontal: ${({horizontalSize, size = Size.MARGIN_16}) =>
    typeof horizontalSize === 'number' ? horizontalSize : size};
  margin-vertical: ${({verticalSize, size = Size.MARGIN_16}) =>
    typeof verticalSize === 'number' ? verticalSize : size};
`

export const HorizontalPadding = styled.View`
  margin-horizontal: ${Size.MARGIN_16};
`

export const VerticalPadding = styled.View`
  margin-vertical: ${Size.MARGIN_16};
`
