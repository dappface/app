import { ActionType } from 'src/redux/module/entity/action-type'
import * as entityType from 'src/redux/module/entity/type'

export const setAccount = (
  account: entityType.IAccount
): entityType.ISetAccount => ({
  payload: { account },
  type: ActionType.SET_ACCOUNT
})

export const setBookmark = (
  bookmark: entityType.IBookmark
): entityType.ISetBookmark => ({
  payload: { bookmark },
  type: ActionType.SET_BOOKMARK
})

export const setHistory = (
  history: entityType.IHistory
): entityType.ISetHistory => ({
  payload: { history },
  type: ActionType.SET_HISTORY
})

export const setTab = (tab: entityType.ITab): entityType.ISetTab => ({
  payload: { tab },
  type: ActionType.SET_TAB
})

export const setToken = (token: entityType.IToken): entityType.ISetToken => ({
  payload: { token },
  type: ActionType.SET_TOKEN
})

export const removeBookmark = (id: string): entityType.IRemoveBookmark => ({
  payload: { id },
  type: ActionType.REMOVE_BOOKMARK
})

export const removeHistory = (
  historyId: string
): entityType.IRemoveHistory => ({
  payload: { id: historyId },
  type: ActionType.REMOVE_HISTORY
})

export const removeTab = (id: string): entityType.IRemoveTab => ({
  payload: { id },
  type: ActionType.REMOVE_TAB
})

export const removeToken = (tokenId: string): entityType.IRemoveToken => ({
  payload: { id: tokenId },
  type: ActionType.REMOVE_TOKEN
})
