import React from 'react'
import {StyleSheet} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {Card} from 'react-native-paper'
import Animated from 'react-native-reanimated'

import {useBottomSheetContext, useDimensions} from 'src/hooks'
import {BrowserNavigation} from './browser-navigation'
import {PullBar} from './pull-bar'
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
          ]}>
          <Card
            elevation={8}
            style={[
              styles.bottomSheet,
              {height: screen.height, width: screen.width},
            ]}>
            <PullBar />
            <BrowserNavigation />
          </Card>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    borderRadius: 16,
  },
})
