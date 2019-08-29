import { ActionType } from 'src/redux/module/browser/action-type'
import * as browserType from 'src/redux/module/browser/type'

export const setActiveTabId = (
  activeTabId?: string
): browserType.ISetActiveTabId => ({
  payload: { activeTabId },
  type: ActionType.SET_ACTIVE_TAB_ID
})

export const setTabIds = (tabIds: string[]): browserType.ISetTabIds => ({
  payload: { tabIds },
  type: ActionType.SET_TAB_IDS
})

export const setOpenRequest = (
  openRequest?: browserType.IOpenRequest
): browserType.ISetOpenRequest => ({
  payload: { openRequest },
  type: ActionType.SET_OPEN_REQUEST
})
