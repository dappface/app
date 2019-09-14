import {IState} from 'src/redux/module'
import * as entityType from 'src/redux/module/entity/type'

export const getAccounts = (state: IState): entityType.IAccounts =>
  state.entity.accounts

export const getBookmarks = (state: IState): entityType.IBookmarks =>
  state.entity.bookmarks

export const getHistories = (state: IState): entityType.IHistories =>
  state.entity.histories

export const getTabs = (state: IState): entityType.ITabs => state.entity.tabs

export const getTokens = (state: IState): entityType.ITokens =>
  state.entity.tokens
