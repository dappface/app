import * as React from 'react'
import { FlatList } from 'react-native'
import Ripple from 'react-native-material-ripple'
import { List, RadioButton } from 'react-native-paper'
import { useMappedState } from 'redux-react-hook'
import { Currency as CurrencyEnum } from 'src/const'
import { IState } from 'src/redux/module'
import { settingHook, settingSelector } from 'src/redux/module/setting'

export const Currency = () => {
  const mapState = React.useCallback(
    (state: IState) => ({
      activeItem: settingSelector.getCurrency(state)
    }),
    []
  )
  const { activeItem } = useMappedState(mapState)
  const { setCurrency } = settingHook.useSettingManager()

  const onSelectFactory = React.useCallback(
    (currency: CurrencyEnum) => () => {
      setCurrency(currency)
    },
    []
  )

  return (
    <FlatList
      data={Object.keys(CurrencyEnum)}
      keyExtractor={key => key}
      renderItem={({ item }) => (
        <Ripple
          onPress={onSelectFactory(CurrencyEnum[item as any] as CurrencyEnum)}
        >
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
