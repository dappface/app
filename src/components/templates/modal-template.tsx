import * as React from 'react'
import {Navigation} from 'react-native-navigation'
import {Colors, FAB} from 'react-native-paper'
import {Expanded} from 'src/components/atoms'
import {BottomDrawer} from 'src/components/organisms'
import styled from 'styled-components/native'

export interface IProps {
  children: React.ReactNode
  componentId: string
  disabled?: boolean
  text?: string
}

export const ModalTemplate = ({
  children,
  componentId,
  disabled = false,
  text,
}: IProps) => {
  const onPressClose = React.useCallback((): void => {
    void Navigation.dismissModal(componentId)
  }, [componentId])

  return (
    <Expanded.View>
      <Expanded.View>{children}</Expanded.View>
      {!disabled ? (
        <StyledFAB
          icon='close'
          label={text || 'close'}
          onPress={onPressClose}
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
