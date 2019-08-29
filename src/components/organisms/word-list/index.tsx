import * as React from 'react'
import { View } from 'react-native'
import { Row } from 'src/components/atoms'
import { Item } from 'src/components/organisms/word-list/item'
import styled from 'styled-components/native'

interface IProps {
  index?: number
  onPressItem?: (i: number) => void
  remove?: (i: number) => void
  words: string[]
}

export const WordList = (props: IProps) => (
  <Container>
    <View>
      {Array.from({ length: 6 }).map((_, i) => (
        <Item key={i} {...props} i={i} />
      ))}
    </View>

    <View>
      {Array.from({ length: 6 }).map((_, ii) => {
        const i = ii + 6
        return <Item key={i} {...props} i={i} />
      })}
    </View>
  </Container>
)

const Container = styled(Row)`
  justify-content: space-evenly;
`
