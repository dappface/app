import { ActionType } from 'src/redux/module/ui/action-type'

// State
export interface IState {
  bottomDrawer?: IBottomDrawer
  snackbarMessage: ISnackbarMessage
}

export interface IBottomDrawer {
  type: BottomDrawerType
  payload?: any
}

export enum BottomDrawerType {
  AccountOptions = 'accountOptions',
  BrowserOptions = 'browserOptions',
  TokenOptions = 'tokenOptions'
}

export interface ISnackbarMessage {
  label: SnackbarLabel
  message: string
  onDismiss: (...args: any[]) => void
  onPress: (...args: any[]) => void
}

export enum SnackbarLabel {
  Dismiss = 'dismiss',
  None = ''
}

// Actions
export type Actions = ISetBottomDrawer | ISetSnackbarMessage

export interface ISetBottomDrawer {
  payload: { bottomDrawer?: IBottomDrawer }
  type: ActionType.SET_BOTTOM_DRAWER
}

export interface ISetSnackbarMessage {
  payload: { snackbarMessage: ISnackbarMessage }
  type: ActionType.SET_SNACKBAR_MESSAGE
}

// Hooks
export interface ISnackbarManager {
  notifyAddressCopied: () => void
}
