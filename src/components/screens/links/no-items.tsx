import * as React from 'react'
import {Caption} from 'react-native-paper'
import {CenteredColumn, Padding} from 'src/components/atoms'
import {Size} from 'src/const'

export const NoItems = () => (
  <CenteredColumn>
    <Padding size={Size.MARGIN_64}>
      <Caption>No Links</Caption>
    </Padding>
  </CenteredColumn>
)
