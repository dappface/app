import {useFormikContext} from 'formik'
import React from 'react'
import {Button} from 'react-native-paper'

export function Submit() {
  const {handleSubmit, isValid} = useFormikContext()
  return (
    <Button disabled={!isValid} mode='contained' onPress={handleSubmit}>
      Next
    </Button>
  )
}
