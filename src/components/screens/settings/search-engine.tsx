import * as React from 'react'
import { FlatList } from 'react-native'
import Ripple from 'react-native-material-ripple'
import { List, RadioButton } from 'react-native-paper'
import { useMappedState } from 'redux-react-hook'
import { SearchEngine as SearchEngineEnum, SearchEngines } from 'src/const'
import { IState } from 'src/redux/module'
import { settingHook, settingSelector } from 'src/redux/module/setting'

export const SearchEngine = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      activeSearchEngine: settingSelector.getSearchEngine(state)
    }),
    []
  )
  const { activeSearchEngine } = useMappedState(mapState)
  const { setSearchEngine } = settingHook.useSettingManager()

  const onSelectFactory = React.useCallback(
    (searchEngine: SearchEngineEnum) => () => {
      setSearchEngine(searchEngine)
    },
    []
  )

  return (
    <FlatList
      data={Object.keys(SearchEngineEnum)}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <Ripple
          onPress={onSelectFactory(SearchEngineEnum[
            item as any
          ] as SearchEngineEnum)}
        >
          <List.Item
            left={() => (
              <RadioButton.Android
                status={
                  SearchEngineEnum[item as any] === activeSearchEngine
                    ? 'checked'
                    : 'unchecked'
                }
                value={item}
              />
            )}
            title={SearchEngines[SearchEngineEnum[item as any]].name}
          />
        </Ripple>
      )}
    />
  )
}