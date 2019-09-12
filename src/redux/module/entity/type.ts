import {ActionType} from 'src/redux/module/entity/action-type'

// All fields are persisted
export interface IState {
  accounts: IAccounts
  bookmarks: IBookmarks
  histories: IHistories
  tabs: ITabs
  tokens: ITokens
}

export type Actions =
  | ISetAccount
  | ISetBookmark
  | ISetHistory
  | ISetTab
  | ISetToken
  | IRemoveBookmark
  | IRemoveHistory
  | IRemoveTab
  | IRemoveToken

export interface ISetAccount {
  payload: {account: IAccount}
  type: ActionType.SET_ACCOUNT
}

export interface ISetBookmark {
  payload: {bookmark: IBookmark}
  type: ActionType.SET_BOOKMARK
}

export interface ISetHistory {
  payload: {history: IHistory}
  type: ActionType.SET_HISTORY
}

export interface ISetTab {
  payload: {tab: ITab}
  type: ActionType.SET_TAB
}

export interface ISetToken {
  payload: {token: IToken}
  type: ActionType.SET_TOKEN
}

export interface IRemoveBookmark {
  payload: {id: string}
  type: ActionType.REMOVE_BOOKMARK
}

export interface IRemoveHistory {
  payload: {id: string}
  type: ActionType.REMOVE_HISTORY
}

export interface IRemoveTab {
  payload: {id: string}
  type: ActionType.REMOVE_TAB
}

export interface IRemoveToken {
  payload: {id: string}
  type: ActionType.REMOVE_TOKEN
}

export interface IAccounts {
  [key: string]: IAccount
}

export interface IBookmarks {
  [key: string]: IBookmark
}

export interface IHistories {
  [key: string]: IHistory
}

export interface ITabs {
  [key: string]: ITab
}

export interface ITokens {
  [key: string]: IToken
}

export interface IAccount {
  address: string
  balance: IBalance
  bookmarkIds: string[]
  historyIds: string[]
  tokenAddresses: string[]
  path: string
  privKey: string
}

export interface IBookmark {
  id: string
  createdAt: Date
  accountAddress: string
  title?: string
  url: string
}

export interface IHistory {
  id: string
  createdAt: Date
  accountAddress?: string
  title?: string
  url: string
}

export interface ITab {
  id: string
  canGoBack: boolean
  canGoForward: boolean
  latestHistoryId?: string
  loadingProgress: number
}

export interface IToken {
  address: string
  accountAddress: string
  decimals: number
  name: string
  symbol: string
  balance: string
}

export interface IBalance {
  ether: string
  fiat: string
  wei: string
}

export interface ICreateAccountParams {
  address: string
  path: string
  privKey: string
}

export interface ICreateBookmarkParams {
  accountAddress: string
  title?: string
  url: string
}

export interface ICreateHistoryParams {
  accountAddress?: string
  title?: string
  url: string
}

export interface ICreateTokenParams {
  accountAddress: string
  address: string
  decimals: number
  name: string
  symbol: string
}
