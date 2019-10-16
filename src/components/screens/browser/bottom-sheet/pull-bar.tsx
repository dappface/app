import React from 'react'
import {Color} from 'src/const'
import styled from 'styled-components/native'

export function PullBar() {
  return (
    <Container>
      <Bar />
    </Container>
  )
}

const Bar = styled.View`
  height: 4;
  width: 40;
  border-radius: 2;
  background-color: ${Color.PRIMARY_500};
`

const Container = styled.View`
  height: 16;
  align-items: center
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
`
