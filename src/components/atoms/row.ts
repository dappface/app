import styled from 'styled-components/native'

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

export const SpaceBetweenRow = styled(Row)`
  justify-content: space-between;
`

export const SpaceEvenlyRow = styled(Row)`
  justify-content: space-evenly;
`
