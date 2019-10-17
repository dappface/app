import React from 'react'

import {Snackbar} from 'src/components/atoms'
import {
  BottomSheetContext,
  BrowserManagerContext,
  StatusBarContext,
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

  if (!initializedWeb3) {
    return null
  }

  return (
    <StatusBarContext.Provider value={initialStatusBarContext}>
      <Web3Context.Provider value={initializedWeb3}>
        <BrowserManagerContext.Provider value={initializedBrowserManager}>
          <BottomSheetContext.Provider value={initialBottomSheetContext}>
            {children}
          </BottomSheetContext.Provider>
          <Snackbar />
        </BrowserManagerContext.Provider>
      </Web3Context.Provider>
    </StatusBarContext.Provider>
  )
}
