import React from 'react'
import {StatusBar as NativeStatusBar} from 'react-native'

import {useStatusBarContext} from 'src/hooks'

export function StatusBar() {
  const {statusBarStyle} = useStatusBarContext()
  return <NativeStatusBar barStyle={statusBarStyle} />
}
