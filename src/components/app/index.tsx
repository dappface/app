import React from 'react'

import {Navigation} from 'src/components/navigation'
import {ApplicationProvider} from './application-provider'
import {LibraryProvider} from './library-provider'

export function App() {
  return (
    <LibraryProvider>
      <ApplicationProvider>
        <Navigation />
      </ApplicationProvider>
    </LibraryProvider>
  )
}
