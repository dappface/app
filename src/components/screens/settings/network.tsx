import React, {useCallback, useMemo} from 'react'
import {FlatList} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {List, RadioButton} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {Network as NetworkEnum, Networks} from 'src/const'
import {settingHook, settingSelector} from 'src/redux/module/setting'

export function Network() {
  const activeItem = useSelector(settingSelector.getNetwork)
  const {setNetwork} = settingHook.useSettingManager()

  const onSelectFactory = useCallback(
    (network: NetworkEnum) => () => {
      setNetwork(network)
    },
    [setNetwork],
  )

  const candidates = useMemo(
    () =>
      Object.keys(NetworkEnum)
        .map(val => parseInt(val, 10))
        .filter(val => !Number.isNaN(val)),
    [],
  )

  return (
    <FlatList
      data={candidates}
      keyExtractor={item => item.toString()}
      renderItem={({item}) => (
        <Ripple onPress={onSelectFactory(item)}>
          <List.Item
            left={() => (
              <RadioButton.Android
                status={item === activeItem ? 'checked' : 'unchecked'}
                value={item.toString()}
              />
            )}
            title={Networks[item].name}
          />
        </Ripple>
      )}
    />
  )
}
