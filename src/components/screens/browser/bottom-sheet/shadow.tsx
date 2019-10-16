import React, {useCallback} from 'react'
import {StyleSheet} from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

import {Color} from 'src/const'
import {IDimensions, useDimensions, useBottomSheetContext} from 'src/hooks'

const {interpolate} = Animated

export function Shadow() {
  const {screen: screenDimensions} = useDimensions()
  const {isOpen, translateY, closeBottomSheet} = useBottomSheetContext()

  const onPress = useCallback(() => {
    closeBottomSheet()
  }, [closeBottomSheet])

  const opacity = interpolate(translateY, {
    inputRange: [0, screenDimensions.height],
    outputRange: [1, 0.1],
  })

  if (!isOpen) {
    return null
  }

  return (
    <StyledTouchable onPress={onPress} screenDimensions={screenDimensions}>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.shadow, {opacity}]}
      />
    </StyledTouchable>
  )
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: Color.MOSTLY_BLACK,
  },
})

interface IStyledTouchableProps {
  screenDimensions: IDimensions['screen']
}

const StyledTouchable = styled.TouchableWithoutFeedback<IStyledTouchableProps>`
  position: absolute;

  ${({screenDimensions}) => `
    height: ${screenDimensions.height};
    width: ${screenDimensions.width};
  `}
`
