import * as React from 'react'
import { TextInputProps, TouchableWithoutFeedback } from 'react-native'
import { Searchbar, Text } from 'react-native-paper'
import { Padding } from 'src/components/atoms'
import { Color, Size } from 'src/const'
import { useBrowserManager } from 'src/hooks'
import styled from 'styled-components/native'

export const Search = () => {
  const { openLink, onSearch } = useBrowserManager()
  const [query, setQuery] = React.useState('')

  const onPressDoodle = (): void => {
    openLink('https://www.dappface.com/doodle-challenge')
  }

  const onSubmitEditing: TextInputProps['onSubmitEditing'] = e => {
    onSearch(e.nativeEvent.text)
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={onPressDoodle}>
        <StyledText>DAPPFACE</StyledText>
      </TouchableWithoutFeedback>

      <Padding>
        <StyledSearchbar
          autoCapitalize='none'
          autoCorrect={false}
          enablesReturnKeyAutomatically
          onChangeText={setQuery}
          onSubmitEditing={onSubmitEditing}
          placeholder='Search or type URL'
          theme={{ roundness: Size.TEXT_INPUT_MIN_HEIGHT / 2 }}
          value={query}
        />
      </Padding>
    </>
  )
}

const StyledText = styled(Text)`
  color: ${Color.TEXT.BLACK_HIGH_EMPHASIS};
  font-family: RobotoSlab-Regular;
  font-size: 28;
  margin-top: ${Size.MARGIN_40};
  text-align: center;
`

const StyledSearchbar = styled(Searchbar)`
  border-radius: ${Size.TEXT_INPUT_MIN_HEIGHT / 2};
`
