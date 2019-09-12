import * as React from 'react'
import {FlatList} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {List, RadioButton} from 'react-native-paper'
import {useMappedState} from 'redux-react-hook'
import {Network as NetworkEnum, Networks} from 'src/const'
import {IState} from 'src/redux/module'
import {settingHook, settingSelector} from 'src/redux/module/setting'

export const Network = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      activeItem: settingSelector.getNetwork(state),
    }),
    [],
  )
  const {activeItem} = useMappedState(mapState)
  const {setNetwork} = settingHook.useSettingManager()

  const onSelectFactory = React.useCallback(
    (network: NetworkEnum) => () => {
      setNetwork(network)
    },
    [setNetwork],
  )

  const candidates = Object.keys(NetworkEnum)
    .map(val => parseInt(val, 10))
    .filter(val => isNaN(val) === false)

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
