import React from 'react'
import {Animated} from 'react-native'
import {
  IDimensions,
  ISafeAreaPosition,
  useBottomAppBarHeight,
  useBottomAppBarInitialTop,
  useDimensions,
  useSafeAreaPosition,
} from 'src/hooks'
import styled from 'styled-components/native'

interface IProps {
  children: any
  isOpen: boolean
  position: Animated.Value
}

export function NavigationBarContainer({children, isOpen, position}: IProps) {
  const bottomAppBarHeight = useBottomAppBarHeight()
  const bottomAppBarInitialTop = useBottomAppBarInitialTop()
  const {screen: screenDimensions} = useDimensions()
  const safeAreaPosition = useSafeAreaPosition()

  if (!isOpen) {
    return (
      <Container bottomAppBarHeight={bottomAppBarHeight}>{children}</Container>
    )
  }

  return (
    <AnimatedContainer
      as={Animated.View}
      bottomAppBarHeight={bottomAppBarHeight}
      bottomAppBarInitialTop={bottomAppBarInitialTop}
      position={position}
      safeAreaPosition={safeAreaPosition}
      screenDimensions={screenDimensions}>
      {children}
    </AnimatedContainer>
  )
}

interface IContainerProps {
  bottomAppBarHeight: number
}

const Container = styled.View<IContainerProps>`
  align-items: center;
  flex-direction: row;
  justify-content: space-around;

  ${({bottomAppBarHeight}) => `
    height: ${bottomAppBarHeight};
  `}
`

interface IAnimatedContainerProps extends IContainerProps {
  bottomAppBarInitialTop: number
  position: Animated.Value
  safeAreaPosition: ISafeAreaPosition
  screenDimensions: IDimensions['screen']
}

const AnimatedContainer = styled.View<IAnimatedContainerProps>`
  align-items: center;
  flex-direction: row;
  justify-content: space-around;

  ${({bottomAppBarHeight}) => `
    height: ${bottomAppBarHeight};
  `}

  ${({
    bottomAppBarInitialTop,
    position,
    safeAreaPosition,
    screenDimensions,
  }) => {
    const opacity = position.interpolate({
      inputRange: [
        safeAreaPosition.top,
        (screenDimensions.height * 3) / 4,
        bottomAppBarInitialTop,
      ],
      outputRange: [0, 0, 1],
    })
    return `opacity: ${opacity.__getValue()};`
  }}
`
