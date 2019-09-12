import * as React from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {Size} from 'src/const'

interface IProps {
  children: any
  isOpen: boolean
  position: Animated.Value
}

export const NavigationBarContainer = ({children, isOpen, position}: IProps) =>
  isOpen ? (
    <Animated.View
      style={[
        styles.navigationBar,
        {
          opacity: position.interpolate({
            inputRange: [
              Size.SCREEN.TOP,
              (Size.SCREEN.HEIGHT * 3) / 4,
              Size.BOTTOM_APP_BAR.INITIAL_TOP,
            ],
            outputRange: [0, 0, 1],
          }),
        },
      ]}>
      {children}
    </Animated.View>
  ) : (
    <View style={styles.navigationBar}>{children}</View>
  )

const styles = StyleSheet.create({
  navigationBar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Size.BOTTOM_APP_BAR.HEIGHT,
    justifyContent: 'space-around',
  },
})
