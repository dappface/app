import styled from 'styled-components/native'

import {Size} from 'src/const'
import {Row} from 'src/components/atoms'

export const AlignTopRow = styled(Row)`
  align-items: flex-start;
`

export const RowWithUnit = styled(AlignTopRow)`
  padding-left: ${Size.MARGIN_16};
`

export const SubInfoContainer = styled.View`
  width: 54;
  height: 64;
  align-items: center;
  justify-content: center;
  top: 4;
`

export type HelperTextType = string | ((value: string) => string)
