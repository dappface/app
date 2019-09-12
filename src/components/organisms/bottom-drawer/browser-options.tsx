import * as React from 'react'
import {List} from 'src/components/organisms/bottom-drawer/list'
import {Option} from 'src/components/organisms/bottom-drawer/option'
import {showLinks, showSettings} from 'src/navigation'
import {uiHook} from 'src/redux/module/ui'

export const BrowserOptions = () => {
  const setBottomDrawer = uiHook.useSetBottomDrawer()

  const onClose = React.useCallback(() => {
    setBottomDrawer()
  }, [setBottomDrawer])

  const onPressLinks = React.useCallback(() => {
    showLinks()
    setBottomDrawer()
  }, [setBottomDrawer])

  const onPressSettings = React.useCallback(() => {
    showSettings()
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
