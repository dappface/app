import * as React from 'react'
import Ripple from 'react-native-material-ripple'
import { IconButton, Text } from 'react-native-paper'
import { Color, Size } from 'src/const'
import styled from 'styled-components/native'

interface IProps {
  i: number
  index?: number
  onPressItem?: (i: number) => void
  remove?: (i: number) => void
  words: string[]
}

export const Item = ({ i, index, onPressItem, remove, words }: IProps) => (
  <Container
    key={i}
    disabled={!onPressItem}
    onPress={() => onPressItem && onPressItem(i)}
  >
    <Index>
      <Text>{i + 1}</Text>
    </Index>

    <Word selected={i === index}>
      <Text>{words.length !== 0 ? words[i] : ''}</Text>
    </Word>

    {words[i] !== '' && remove && (
      <IconButton icon='close' onPress={() => remove(i)} size={20} />
    )}
  </Container>
)

enum ItemSize {
  IndexWidth = 16,
  WordWidth = 84
}

const Container = styled(Ripple)`
  flex-direction: row;
  align-items: center;
  height: ${Size.ICON_BUTTON_WIDTH};
  width: ${ItemSize.IndexWidth + ItemSize.WordWidth + Size.ICON_BUTTON_WIDTH};
  border-radius: ${Size.BORDER_RADIUS};
  overflow: hidden;
`

const Index = styled.View`
  align-items: flex-end;
  width: ${ItemSize.IndexWidth};
  margin-right: ${Size.MARGIN_16};
`

const Word = styled.View`
  width: ${ItemSize.WordWidth};
  align-items: center;
  border-bottom-width: 1;
  border-bottom-color: ${({ selected }: { selected: boolean }) =>
    selected ? Color.BRIGHT_RED : Color.TEXT.BLACK_HIGH_EMPHASIS};
`
