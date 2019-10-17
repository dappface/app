import React, {useEffect} from 'react'
import {YellowBox} from 'react-native'

import {Navigation} from 'src/components/navigation'
import {ApplicationProvider} from './application-provider'
import {LibraryProvider} from './library-provider'

export function App() {
  useEffect(() => {
    YellowBox.ignoreWarnings([
      'Remote debugger',
      '`-[RCTRootView',
      'Require cycle: node_modules/react-native-paper',
    ])
  }, [])

  return (
    <LibraryProvider>
      <ApplicationProvider>
        <Navigation />
      </ApplicationProvider>
    </LibraryProvider>
  )
}
