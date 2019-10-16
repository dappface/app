import React from 'react'
import {StyleSheet} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

import {useBottomSheetContext, useDimensions} from 'src/hooks'
import {Shadow} from './shadow'

export function BottomSheet() {
  const {screen} = useDimensions()
  const {handleGesture, translateY} = useBottomSheetContext()

  return (
    <>
      <Shadow />
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={handleGesture}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {height: screen.height, width: screen.width},
            {transform: [{translateY}]},
          ]}
        />
      </PanGestureHandler>
    </>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 16,
  },
})
