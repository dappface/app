import React, {useCallback} from 'react'
import {Colors, Portal, Snackbar as PaperSnackbar} from 'react-native-paper'
import {useMappedState} from 'redux-react-hook'
import {IState} from 'src/redux/module'
import {uiSelector} from 'src/redux/module/ui'

export const Snackbar = () => {
  const mapState = useCallback(
    (state: IState) => ({
      snackbarMessage: uiSelector.getSnackbarMessage(state),
    }),
    [],
  )
  const {snackbarMessage} = useMappedState(mapState)

  return (
    <Portal>
      <PaperSnackbar
        visible={!!snackbarMessage.message}
        onDismiss={snackbarMessage.onDismiss}
        duration={PaperSnackbar.DURATION_SHORT}
        action={{
          label: snackbarMessage.label,
          onPress: snackbarMessage.onDismiss,
        }}
        theme={{colors: {accent: Colors.pink400}}}>
        {snackbarMessage.message}
      </PaperSnackbar>
    </Portal>
  )
}
