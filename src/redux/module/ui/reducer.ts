import {ActionType} from 'src/redux/module/ui/action-type'
import {
  ISnackbarMessage,
  SnackbarLabel,
  Actions,
  IState,
} from 'src/redux/module/ui/type'

export const emptySnackbarMessage: ISnackbarMessage = {
  label: SnackbarLabel.None,
  message: '',
  onDismiss: () => {},
  onPress: () => {},
}

export const initialState: IState = {
  snackbarMessage: emptySnackbarMessage,
}

export function reducer(state: IState = initialState, action: Actions): IState {
  switch (action.type) {
    case ActionType.SET_BOTTOM_DRAWER:
      return {...state, bottomDrawer: action.payload.bottomDrawer}
    case ActionType.SET_SNACKBAR_MESSAGE:
      return {...state, snackbarMessage: action.payload.snackbarMessage}
    default:
      return state
  }
}
