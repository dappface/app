import React, {useCallback} from 'react'
import {Colors, List} from 'react-native-paper'
import {useNavigation} from '@react-navigation/core'
import {useSelector} from 'react-redux'

import {ModalTemplate} from 'src/components/templates'
import {ScreenName} from 'src/const'
import {useNukeRedux} from 'src/redux'
import {accountSelector} from 'src/redux/module/account'
import {settingSelector} from 'src/redux/module/setting'

export {BackupScreen, QuizScreen} from './backup'
export {CurrencyScreen} from './currency'
export {NetworkScreen} from './network'
export {SearchEngineScreen} from './search-engine'

interface IProps {
  componentId: string
}

export function SettingsScreen({componentId}: IProps) {
  const currency = useSelector(settingSelector.getCurrency)
  const isBackedUp = useSelector(accountSelector.getIsBackedUp)
  const mnemonic = useSelector(accountSelector.getMnemonic)
  const network = useSelector(settingSelector.getNetworkName)
  const searchEngine = useSelector(settingSelector.getSearchEngine)
  const nukeRedux = useNukeRedux()
  const navigation = useNavigation()

  const onPressNetwork = useCallback((): void => {
    navigation.navigate(ScreenName.SettingsNetworkScreen)
  }, [navigation])

  const onPressCurrency = useCallback((): void => {
    navigation.navigate(ScreenName.SettingsCurrencyScreen)
  }, [navigation])

  const onPressSearchEngine = useCallback((): void => {
    navigation.navigate(ScreenName.SettingsSearchEngineScreen)
  }, [navigation])

  const onPressRecoveryPhrase = useCallback((): void => {
    navigation.navigate(ScreenName.SettingsBackupScreen)
  }, [componentId])

  const onPressClearAll = useCallback((): void => {
    nukeRedux()
    navigation.navigate(ScreenName.BrowserScreen)
  }, [navigation])

  return (
    <ModalTemplate>
      <List.Section>
        <List.Item
          description={network}
          left={() => <List.Icon icon='wifi' color={Colors.grey900} />}
          onPress={onPressNetwork}
          title='Network'
        />
        <List.Item
          description={currency}
          left={() => <List.Icon icon='attach-money' color={Colors.grey900} />}
          onPress={onPressCurrency}
          title='Currency'
        />
        <List.Item
          description={searchEngine}
          left={() => <List.Icon icon='search' color={Colors.grey900} />}
          onPress={onPressSearchEngine}
          title='Search Engine'
        />
      </List.Section>

      <List.Section>
        {mnemonic ? (
          <List.Item
            description={!isBackedUp ? 'Not Backed Up' : 'Backed Up'}
            left={() => <List.Icon icon='lock-open' color={Colors.grey900} />}
            onPress={onPressRecoveryPhrase}
            title='Recovery Phrase'
          />
        ) : null}
      </List.Section>

      <List.Section>
        {__DEV__ ? (
          <List.Item
            left={() => <List.Icon icon='delete' color={Colors.grey900} />}
            onPress={onPressClearAll}
            title='Clear All Data'
          />
        ) : null}
      </List.Section>
    </ModalTemplate>
  )
}
