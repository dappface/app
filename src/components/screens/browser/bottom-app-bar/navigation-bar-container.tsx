import React from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {
  useBottomAppBarHeight,
  useBottomAppBarInitialTop,
  useDimensions,
  useSafeAreaPosition,
} from 'src/hooks'

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
      <View style={[styles.navigationBar, {height: bottomAppBarHeight}]}>
        {children}
      </View>
    )
  }

  return (
    <Animated.View
      style={[
        styles.navigationBar,
        {
          height: bottomAppBarHeight,
          opacity: position.interpolate({
            inputRange: [
              safeAreaPosition.top,
              (screenDimensions.height * 3) / 4,
              bottomAppBarInitialTop,
            ],
            outputRange: [0, 0, 1],
          }),
        },
      ]}>
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  navigationBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
