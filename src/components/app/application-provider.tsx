import React from 'react'

import {Snackbar} from 'src/components/atoms'
import {
  BottomAppBarManagerContext,
  BottomSheetContext,
  BrowserManagerContext,
  StatusBarContext,
  useInitializedBottomAppBarManager,
  useInitialBottomSheetContext,
  useInitializedBrowserManager,
  useInitialStatusBarContext,
  useInitializedWeb3,
  Web3Context,
} from 'src/hooks'

interface IProps {
  children: JSX.Element[] | JSX.Element
}

export function ApplicationProvider({children}: IProps) {
  const initialStatusBarContext = useInitialStatusBarContext()
  const initializedWeb3 = useInitializedWeb3()
  const initializedBrowserManager = useInitializedBrowserManager()
  const initialBottomSheetContext = useInitialBottomSheetContext(
    initialStatusBarContext,
  )
  const initializedBottomAppBarManager = useInitializedBottomAppBarManager()

  if (!initializedWeb3) {
    return null
  }

  return (
    <StatusBarContext.Provider value={initialStatusBarContext}>
      <Web3Context.Provider value={initializedWeb3}>
        <BrowserManagerContext.Provider value={initializedBrowserManager}>
          <BottomAppBarManagerContext.Provider
            value={initializedBottomAppBarManager}>
            <BottomSheetContext.Provider value={initialBottomSheetContext}>
              {children}
            </BottomSheetContext.Provider>
            <Snackbar />
          </BottomAppBarManagerContext.Provider>
        </BrowserManagerContext.Provider>
      </Web3Context.Provider>
    </StatusBarContext.Provider>
  )
}
