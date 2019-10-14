import React from 'react'
import {View} from 'react-native'
import {Row} from 'src/components/atoms'
import {Item} from 'src/components/organisms/word-list/item'
import styled from 'styled-components/native'

interface IProps {
  index?: number
  onPressItem?: (i: number) => void
  remove?: (i: number) => void
  words: string[]
}

export function WordList({index, onPressItem, remove, words}: IProps) {
  return (
    <Container>
      <View>
        {Array.from({length: 6}).map((_, i) => (
          <Item
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            i={i}
            index={index}
            onPressItem={onPressItem}
            remove={remove}
            words={words}
          />
        ))}
      </View>

      <View>
        {Array.from({length: 6}).map((_, ii) => {
          const i = ii + 6
          return (
            <Item
              key={i}
              i={i}
              index={index}
              onPressItem={onPressItem}
              remove={remove}
              words={words}
            />
          )
        })}
      </View>
    </Container>
  )
}

const Container = styled(Row)`
  justify-content: space-evenly;
`
