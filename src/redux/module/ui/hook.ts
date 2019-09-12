import {useCallback} from 'react'
import {useDispatch} from 'redux-react-hook'
import * as uiAction from 'src/redux/module/ui/action'
import * as uiType from 'src/redux/module/ui/type'

export const useSetBottomDrawer = () => {
  const dispatch = useDispatch()
  return useCallback(
    (bottomDrawler?: uiType.IBottomDrawer) => {
      dispatch(uiAction.setBottomDrawer(bottomDrawler))
    },
    [dispatch],
  )
}

export const useSnackbarManager = (): uiType.ISnackbarManager => {
  const dispatch = useDispatch()
  const notifyAddressCopied = useCallback(() => {
    dispatch(
      uiAction.setSnackbarMessage({
        label: uiType.SnackbarLabel.Dismiss,
        message: 'The address is copied to clipboard.',
        onDismiss: () => {
          dispatch(uiAction.resetSnackbarMessage())
        },
        onPress: () => {
          dispatch(uiAction.resetSnackbarMessage())
        },
      }),
    )
  }, [dispatch])

  return {
    notifyAddressCopied,
  }
}
