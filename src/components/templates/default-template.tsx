import React, {ReactNode} from 'react'
import {BottomDrawer} from 'src/components/organisms'
import styled from 'styled-components/native'

interface IProps {
  children: ReactNode
}

export const DefaultTemplate = ({children}: IProps) => (
  <Container>
    {children}
    <BottomDrawer />
  </Container>
)

const Container = styled.View`
  flex: 1;
`
