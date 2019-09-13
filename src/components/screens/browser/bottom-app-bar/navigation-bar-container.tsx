import React from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {Size} from 'src/const'
import {useSafeAreaPosition} from 'src/hooks'

interface IProps {
  children: any
  isOpen: boolean
  position: Animated.Value
}

export function NavigationBarContainer({children, isOpen, position}: IProps) {
  const safeAreaPosition = useSafeAreaPosition()

  if (!isOpen) {
    return <View style={styles.navigationBar}>{children}</View>
  }

  return (
    <Animated.View
      style={[
        styles.navigationBar,
        {
          opacity: position.interpolate({
            inputRange: [
              safeAreaPosition.top,
              (Size.SCREEN.HEIGHT * 3) / 4,
              Size.BOTTOM_APP_BAR.INITIAL_TOP,
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
    height: Size.BOTTOM_APP_BAR.HEIGHT,
    justifyContent: 'space-around',
  },
})
