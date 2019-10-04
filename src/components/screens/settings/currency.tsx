import React, {useCallback} from 'react'
import {FlatList} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {List, RadioButton} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {Currency as CurrencyEnum} from 'src/const'
import {settingHook, settingSelector} from 'src/redux/module/setting'

export function CurrencyScreen() {
  const activeItem = useSelector(settingSelector.getCurrency)
  const {setCurrency} = settingHook.useSettingManager()

  const onSelectFactory = useCallback(
    (currency: CurrencyEnum) => () => {
      setCurrency(currency)
    },
    [setCurrency],
  )

  return (
    <FlatList
      data={Object.values(CurrencyEnum)}
      keyExtractor={key => key}
      renderItem={({item}) => (
        <Ripple onPress={onSelectFactory(item as CurrencyEnum)}>
          <List.Item
            left={() => (
              <RadioButton.Android
                status={item === activeItem ? 'checked' : 'unchecked'}
                value={item}
              />
            )}
            title={item}
          />
        </Ripple>
      )}
    />
  )
}
