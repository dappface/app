import React, {useCallback} from 'react'
import {useNavigation} from '@react-navigation/core'

import {ScreenName} from 'src/const'
import {uiHook} from 'src/redux/module/ui'
import {List} from './list'
import {Option} from './option'

export function BrowserOptions() {
  const setBottomDrawer = uiHook.useSetBottomDrawer()
  const navigation = useNavigation()

  const onClose = useCallback(() => {
    setBottomDrawer()
  }, [setBottomDrawer])

  const onPressLinks = useCallback(() => {
    showLinks()
    setBottomDrawer()
  }, [setBottomDrawer])

  const onPressSettings = useCallback(() => {
    navigation.navigate(ScreenName.Settings)
    setBottomDrawer()
  }, [setBottomDrawer])

  return (
    <List onClose={onClose}>
      <Option title='Links' iconName='md-link' onPress={onPressLinks} />
      <Option
        title='Settings'
        iconName='md-settings'
        onPress={onPressSettings}
      />
    </List>
  )
}
