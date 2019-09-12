import {IState as IAllState} from 'src/redux/module'
import * as entityType from 'src/redux/module/entity/type'

export const getAccounts = (state: IAllState): entityType.IAccounts =>
  state.entity.accounts

export const getBookmarks = (state: IAllState): entityType.IBookmarks =>
  state.entity.bookmarks

export const getHistories = (state: IAllState): entityType.IHistories =>
  state.entity.histories

export const getTabs = (state: IAllState): entityType.ITabs => state.entity.tabs

export const getTokens = (state: IAllState): entityType.ITokens =>
  state.entity.tokens
