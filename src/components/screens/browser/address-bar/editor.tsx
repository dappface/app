import * as React from 'react'
import { TextInputProps } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { Padding } from 'src/components/atoms'
import { Size } from 'src/const'

export interface IEditorProps {
  onBlur: TextInputProps['onBlur']
  onSubmitEditing: TextInputProps['onSubmitEditing']
  url?: string
}

export const Editor = ({ onBlur, onSubmitEditing, url }: IEditorProps) => {
  const [query, setQuery] = React.useState(url)
  return (
    <Padding size={Size.MARGIN_4}>
      <Searchbar
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={true}
        enablesReturnKeyAutomatically
        onChangeText={setQuery}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        selectTextOnFocus={true}
        theme={{ roundness: Size.TEXT_INPUT_MIN_HEIGHT / 2 }}
        value={query}
      />
    </Padding>
  )
}
