import React, {useCallback} from 'react'
import {FlatList} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {List, RadioButton} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {SearchEngine as SearchEngineEnum, SearchEngines} from 'src/const'
import {settingHook, settingSelector} from 'src/redux/module/setting'

export function SearchEngine() {
  const activeSearchEngine = useSelector(settingSelector.getSearchEngine)
  const {setSearchEngine} = settingHook.useSettingManager()

  const onSelectFactory = useCallback(
    (searchEngine: SearchEngineEnum) => () => {
      setSearchEngine(searchEngine)
    },
    [setSearchEngine],
  )

  return (
    <FlatList
      data={Object.values(SearchEngineEnum)}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <Ripple onPress={onSelectFactory(item)}>
          <List.Item
            left={() => (
              <RadioButton.Android
                status={item === activeSearchEngine ? 'checked' : 'unchecked'}
                value={item}
              />
            )}
            title={SearchEngines[item].name}
          />
        </Ripple>
      )}
    />
  )
}
