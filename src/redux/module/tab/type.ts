import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import {entityType} from 'src/redux/module/entity'

export interface ITabListManager {
  addTab: () => entityType.ITab
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  removeFactory: (tabId: string) => () => void
  selectFactory: (tabId: string) => () => void
}

export interface ITabManager {
  setLatestHistoryId: (tabId: string, latestHistoryId: string) => void
  setLoadingProgress: (tabId: string, loadingProgress: number) => void
  setNavigatables: (tabId: string, navigatables: INavigatablesParams) => void
}

export interface IUpdateTabParams {
  id: string
  canGoBack?: boolean
  canGoForward?: boolean
  latestTitle?: string
  latestUrl?: string
  loadingProgress?: number
}

export interface ITab {
  id: string
  isLoading: boolean
  title?: string
  url?: string
}

export interface INavigatablesParams {
  canGoBack: boolean
  canGoForward: boolean
}
