import * as React from 'react'
import {Caption, Headline} from 'react-native-paper'
import styled from 'styled-components/native'

import {Color} from 'src/const'

interface IProps {
  error?: string
}

export const Error = ({error}: IProps) => (
  <Container>
    <Headline>Whoops!</Headline>
    <Caption>{error}</Caption>
  </Container>
)

const Container = styled.View`
  flex: 1;
  background: ${Color.PRIMARY};
  align-items: center;
  justify-content: center;
`
