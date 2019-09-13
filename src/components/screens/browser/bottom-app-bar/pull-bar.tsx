import React from 'react'
import {Color} from 'src/const'
import {IDimensions, useDimensions} from 'src/hooks'
import styled from 'styled-components/native'

export function PullBar() {
  const {screen: screenDimensions} = useDimensions()

  return (
    <Container screenDimensions={screenDimensions}>
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

interface IContainerProps {
  screenDimensions: IDimensions['screen']
}

const Container = styled.View<IContainerProps>`
  align-items: center
  height: 16;
  justify-content: center;
  position: absolute;

  ${({screenDimensions}) => `
    width: ${screenDimensions.width};
  `}
`
