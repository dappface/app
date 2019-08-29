import { ActionType } from 'src/redux/module/browser/action-type'

export interface IState {
  activeTabId?: string // persisted
  tabIds: string[] // persisted
  openRequest?: IOpenRequest
}

export type Actions = ISetActiveTabId | ISetTabIds | ISetOpenRequest

export interface ISetActiveTabId {
  payload: { activeTabId?: string }
  type: ActionType.SET_ACTIVE_TAB_ID
}

export interface ISetTabIds {
  payload: { tabIds: string[] }
  type: ActionType.SET_TAB_IDS
}

export interface ISetOpenRequest {
  payload: { openRequest?: IOpenRequest }
  type: ActionType.SET_OPEN_REQUEST
}

export interface IOpenRequest {
  tabId: string
  url: string
}

export enum BookmarkStatus {
  Disabled = 'Disabled',
  Bookmarked = 'Bookmarked',
  NotBookmarked = 'NotBookmarked'
}
