import React from 'react'
import {createAppContainer} from 'react-navigation'

import {createAppNavigator} from 'src/components/navigation'
import {ApplicationProvider} from './application-provider'
import {LibraryProvider} from './library-provider'

const appNavigator = createAppNavigator()
const AppContainer = createAppContainer(appNavigator)

export function App() {
  return (
    <LibraryProvider>
      <ApplicationProvider>
        <AppContainer />
      </ApplicationProvider>
    </LibraryProvider>
  )
}
