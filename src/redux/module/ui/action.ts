import { ActionType } from 'src/redux/module/ui/action-type'
import { emptySnackbarMessage } from 'src/redux/module/ui/reducer'
import * as uiType from 'src/redux/module/ui/type'

export const setBottomDrawer = (
  bottomDrawer?: uiType.IBottomDrawer
): uiType.ISetBottomDrawer => ({
  payload: { bottomDrawer },
  type: ActionType.SET_BOTTOM_DRAWER
})

export const setSnackbarMessage = (
  snackbarMessage: uiType.ISnackbarMessage
): uiType.ISetSnackbarMessage => ({
  payload: { snackbarMessage },
  type: ActionType.SET_SNACKBAR_MESSAGE
})

export const resetSnackbarMessage = (): uiType.ISetSnackbarMessage => ({
  payload: { snackbarMessage: emptySnackbarMessage },
  type: ActionType.SET_SNACKBAR_MESSAGE
})
