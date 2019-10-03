import React from 'react'
import {useField} from 'formik'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {Blockie} from 'src/components/atoms'
import {Color} from 'src/const'
import {SubInfoContainer} from './shared'

export function RecipientBlockie() {
  const [field, meta] = useField('to')
  return (
    <SubInfoContainer>
      {meta.error || field.value === '' ? (
        <Ionicons
          name='md-contact'
          size={26}
          color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
        />
      ) : (
        <Blockie address={field.value} size={22} />
      )}
    </SubInfoContainer>
  )
}
