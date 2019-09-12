import {ActionType} from 'src/redux/module/entity/action-type'
import {Actions, IState} from 'src/redux/module/entity/type'

export const initialState: IState = {
  accounts: {},
  bookmarks: {},
  histories: {},
  tabs: {},
  tokens: {},
}

export function reducer(state: IState = initialState, action: Actions): IState {
  switch (action.type) {
    case ActionType.SET_ACCOUNT:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [action.payload.account.address]: action.payload.account,
        },
      }
    case ActionType.SET_BOOKMARK:
      return {
        ...state,
        bookmarks: {
          ...state.bookmarks,
          [action.payload.bookmark.id]: action.payload.bookmark,
        },
      }
    case ActionType.SET_HISTORY:
      return {
        ...state,
        histories: {
          ...state.histories,
          [action.payload.history.id]: action.payload.history,
        },
      }
    case ActionType.SET_TAB:
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [action.payload.tab.id]: action.payload.tab,
        },
      }
    case ActionType.SET_TOKEN:
      return {
        ...state,
        tokens: {
          ...state.tokens,
          [action.payload.token.address]: action.payload.token,
        },
      }
    case ActionType.REMOVE_BOOKMARK: {
      const {[action.payload.id]: _, ...bookmarks} = state.bookmarks
      return {...state, bookmarks}
    }
    case ActionType.REMOVE_HISTORY: {
      const {[action.payload.id]: _, ...histories} = state.histories
      return {...state, histories}
    }
    case ActionType.REMOVE_TAB: {
      const {[action.payload.id]: _, ...tabs} = state.tabs
      return {...state, tabs}
    }
    case ActionType.REMOVE_TOKEN: {
      const {[action.payload.id]: _, ...tokens} = state.tokens
      return {...state, tokens}
    }
    default:
      return state
  }
}
