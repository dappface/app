import * as React from 'react'
import {ActivityIndicator} from 'react-native-paper'
import {Padding} from 'src/components/atoms'
import {Size} from 'src/const'

interface IProps {
  isRefetch?: boolean
}

export const Loading = ({isRefetch = false}: IProps) => (
  <Padding size={isRefetch ? Size.MARGIN_64 : undefined}>
    <ActivityIndicator />
  </Padding>
)
