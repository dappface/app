import React from 'react'
import {useSelector} from 'react-redux'
import {Colors, Portal, Snackbar as PaperSnackbar} from 'react-native-paper'
import {uiSelector} from 'src/redux/module/ui'

export function Snackbar() {
  const snackbarMessage = useSelector(uiSelector.getSnackbarMessage)

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
