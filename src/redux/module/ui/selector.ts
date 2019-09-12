import {IState} from 'src/redux/module'
import * as uiType from 'src/redux/module/ui/type'

export const getBottomDrawer = ({
  ui,
}: IState): uiType.IBottomDrawer | undefined => ui.bottomDrawer

export const getSnackbarMessage = ({ui}: IState): uiType.ISnackbarMessage =>
  ui.snackbarMessage
