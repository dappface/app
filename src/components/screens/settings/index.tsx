import React, {useCallback} from 'react'
import {Navigation} from 'react-native-navigation'
import {Colors, List} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {ModalTemplate} from 'src/components/templates'
import * as Navigator from 'src/navigation'
import {useNukeRedux} from 'src/redux'
import {accountSelector} from 'src/redux/module/account'
import {settingSelector} from 'src/redux/module/setting'

export {Backup, Quiz} from 'src/components/screens/settings/backup'
export {Currency} from 'src/components/screens/settings/currency'
export {Network} from 'src/components/screens/settings/network'
export {SearchEngine} from 'src/components/screens/settings/search-engine'

export interface IProps {
  componentId: string
}

export function Settings({componentId}: IProps) {
  const currency = useSelector(settingSelector.getCurrency)
  const isBackedUp = useSelector(accountSelector.getIsBackedUp)
  const mnemonic = useSelector(accountSelector.getMnemonic)
  const network = useSelector(settingSelector.getNetworkName)
  const searchEngine = useSelector(settingSelector.getSearchEngine)
  const nukeRedux = useNukeRedux()

  const onPressClearAll = useCallback(async (): Promise<void> => {
    await Navigation.dismissAllModals()
    await Navigator.goToBrowser()
    nukeRedux()
  }, [nukeRedux])

  const onPressCurrency = useCallback((): void => {
    Navigator.pushCurrencySetting(componentId)
  }, [componentId])

  const onPressNetwork = useCallback((): void => {
    Navigator.pushNetworkSetting(componentId)
  }, [componentId])

  const onPressRecoveryPhrase = useCallback((): void => {
    Navigator.pushBackup(componentId)
  }, [componentId])

  const onPressSearchEngine = useCallback((): void => {
    Navigator.pushSearchEngineSetting(componentId)
  }, [componentId])

  return (
    <ModalTemplate componentId={componentId}>
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
