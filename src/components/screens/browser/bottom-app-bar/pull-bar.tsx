import * as React from 'react'
import { Color, Size } from 'src/const'
import styled from 'styled-components/native'

export const PullBar = () => (
  <Container>
    <Bar />
  </Container>
)

const Bar = styled.View`
  height: 4;
  width: 40;
  border-radius: 2;
  background-color: ${Color.PRIMARY_500};
`

const Container = styled.View`
  align-items: center
  height: 16;
  justify-content: center;
  position: absolute;
  width: ${Size.SCREEN.WIDTH};
`
