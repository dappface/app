import {createContext, useContext, useState} from 'react'

import {StatusBarStyle} from 'src/const'

export function useStatusBarContext(): IStatusBarContext {
  return useContext(StatusBarContext) as IStatusBarContext
}

export const StatusBarContext = createContext<IStatusBarContext | undefined>(
  undefined,
)

export interface IStatusBarContext {
  statusBarStyle: StatusBarStyle
  setStatusBarStyle: (style: StatusBarStyle) => void
}

export function useInitialStatusBarContext(): IStatusBarContext {
  const [statusBarStyle, setStatusBarStyle] = useState(
    StatusBarStyle.DARK_CONTENT,
  )

  return {
    statusBarStyle,
    setStatusBarStyle,
  }
}
