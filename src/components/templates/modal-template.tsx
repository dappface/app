import {useNavigation} from '@react-navigation/core'
import React, {useCallback} from 'react'
import {Colors, FAB} from 'react-native-paper'
import styled from 'styled-components/native'

import {Expanded} from 'src/components/atoms'
import {BottomDrawer} from 'src/components/organisms'
import {ScreenName} from 'src/const'

interface IProps {
  children: JSX.Element | JSX.Element[]
  disabled?: boolean
  onClose?: () => void
  text?: string
}

export function ModalTemplate({
  children,
  disabled = false,
  onClose,
  text,
}: IProps) {
  const navigation = useNavigation()
  const onPressClose = useCallback(() => {
    navigation.navigate(ScreenName.BrowserScreen)
  }, [navigation])

  return (
    <Expanded.View>
      <Expanded.View>{children}</Expanded.View>
      {!disabled ? (
        <StyledFAB
          icon='close'
          label={text || 'close'}
          onPress={onClose || onPressClose}
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
