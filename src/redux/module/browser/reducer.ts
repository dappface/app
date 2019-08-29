import { ActionType } from 'src/redux/module/browser/action-type'
import { Actions, IState } from 'src/redux/module/browser/type'

export const initialState: IState = {
  tabIds: []
}

export function reducer(state: IState = initialState, action: Actions): IState {
  switch (action.type) {
    case ActionType.SET_ACTIVE_TAB_ID:
      return {
        ...state,
        activeTabId: action.payload.activeTabId
      }
    case ActionType.SET_TAB_IDS:
      return {
        ...state,
        tabIds: action.payload.tabIds
      }
    case ActionType.SET_OPEN_REQUEST:
      return {
        ...state,
        openRequest: action.payload.openRequest
      }
    default:
      return state
  }
}
