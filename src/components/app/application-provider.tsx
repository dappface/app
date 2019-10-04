import React from 'react'

import {Snackbar} from 'src/components/atoms'
import {
  BottomAppBarManagerContext,
  BrowserManagerContext,
  useInitializedBottomAppBarManager,
  useInitializedBrowserManager,
  useInitializedWeb3,
  Web3Context,
} from 'src/hooks'

interface IProps {
  children: JSX.Element[] | JSX.Element
}

export function ApplicationProvider({children}: IProps) {
  const initializedBrowserManager = useInitializedBrowserManager()
  const initializedBottomAppBarManager = useInitializedBottomAppBarManager()
  const initializedWeb3 = useInitializedWeb3()

  if (!initializedWeb3) {
    return null
  }

  return (
    <Web3Context.Provider value={initializedWeb3}>
      <BrowserManagerContext.Provider value={initializedBrowserManager}>
        <BottomAppBarManagerContext.Provider
          value={initializedBottomAppBarManager}>
          {children}
          <Snackbar />
        </BottomAppBarManagerContext.Provider>
      </BrowserManagerContext.Provider>
    </Web3Context.Provider>
  )
}
