import * as entityType from 'src/redux/module/entity/type'
import uuid from 'uuid/v4'

export const createAccount = (
  params: entityType.ICreateAccountParams
): entityType.IAccount => ({
  ...params,
  balance: {
    ether: '--',
    fiat: '--',
    wei: '--'
  },
  bookmarkIds: [],
  historyIds: [],
  tokenAddresses: []
})

export const createBookmark = (
  params: entityType.ICreateBookmarkParams
): entityType.IBookmark => ({
  ...params,
  createdAt: new Date(),
  id: uuid()
})

export const createHistory = (
  params: entityType.ICreateHistoryParams
): entityType.IHistory => ({
  ...params,
  createdAt: new Date(),
  id: uuid()
})

export const createTab = (): entityType.ITab => ({
  canGoBack: false,
  canGoForward: false,
  id: uuid(),
  loadingProgress: 0
})

export const createToken = (
  params: entityType.ICreateTokenParams
): entityType.IToken => ({
  ...params,
  balance: '--'
})
