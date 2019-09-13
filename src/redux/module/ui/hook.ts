import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import * as uiAction from 'src/redux/module/ui/action'
import * as uiType from 'src/redux/module/ui/type'

export function useSetBottomDrawer() {
  const dispatch = useDispatch()
  return useCallback(
    (bottomDrawler?: uiType.IBottomDrawer): void => {
      dispatch(uiAction.setBottomDrawer(bottomDrawler))
    },
    [dispatch],
  )
}

export function useSnackbarManager(): uiType.ISnackbarManager {
  const dispatch = useDispatch()
  const notifyAddressCopied = useCallback((): void => {
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
