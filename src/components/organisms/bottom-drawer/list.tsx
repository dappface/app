import React from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import {Card} from 'react-native-paper'
import {Option} from 'src/components/organisms/bottom-drawer/option'
import {Color} from 'src/const'
import {IDimensions, useDimensions, useHasBezel} from 'src/hooks'
import styled from 'styled-components/native'

interface IProps {
  children: React.ReactNode
  onClose: () => void
}

export function List({children, onClose}: IProps) {
  const hasBezel = useHasBezel()
  const dimensions = useDimensions()

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Background dimensions={dimensions}>
        <Container elevation={24} dimensions={dimensions} hasBezel={hasBezel}>
          {children}
          <Cancel title='Cancel' iconName='md-close' onPress={onClose} />
        </Container>
      </Background>
    </TouchableWithoutFeedback>
  )
}

interface IBackgroundProps {
  dimensions: IDimensions
}

const Background = styled.View<IBackgroundProps>`
  background: rgba(0, 0, 0, 0.38);
  height: ${({dimensions}) => dimensions.window.height};
  width: ${({dimensions}) => dimensions.window.width};
  position: absolute;
  bottom: 0;
`

interface IContainerProps {
  dimensions: IDimensions
  hasBezel: boolean
}

const Container = styled(Card)<IContainerProps>`
  position: absolute;
  bottom: 0;
  background-color: ${Color.PRIMARY};
  width: ${({dimensions}) => dimensions.window.width};

  ${({hasBezel}) =>
    !hasBezel &&
    `
    padding-bottom: 34;
  `}
`

const Cancel = styled(Option as any)`
  border-top-width: 1px;
  border-top-color: ${Color.TEXT.BLACK_DISABLED};
`
