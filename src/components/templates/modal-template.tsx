import {useNavigation} from '@react-navigation/core'
import React from 'react'
import {Colors, FAB} from 'react-native-paper'
import styled from 'styled-components/native'

import {Expanded} from 'src/components/atoms'
import {BottomDrawer} from 'src/components/organisms'

interface IProps {
  children: React.ReactNode
  disabled?: boolean
  text?: string
}

export function ModalTemplate({children, disabled = false, text}: IProps) {
  const navigation = useNavigation()

  return (
    <Expanded.View>
      <Expanded.View>{children}</Expanded.View>
      {!disabled ? (
        <StyledFAB
          icon='close'
          label={text || 'close'}
          onPress={navigation.popToTop}
          theme={{colors: {accent: Colors.white}}}
        />
      ) : null}
      <BottomDrawer />
    </Expanded.View>
  )
}

const StyledFAB = styled(FAB)`
  width: 120;
  position: absolute;
  bottom: 40;
  align-self: center;
`
