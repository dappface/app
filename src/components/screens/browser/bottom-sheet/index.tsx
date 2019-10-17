import React from 'react'
import {StyleSheet} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {Card} from 'react-native-paper'
import Animated from 'react-native-reanimated'
import {useSelector} from 'react-redux'

import {Wallet} from 'src/components/screens/wallet'
import {useBottomSheetContext, useDimensions} from 'src/hooks'
import {accountSelector} from 'src/redux/module/account'
import {BrowserNavigation} from './browser-navigation'
import {PullBar} from './pull-bar'
import {Shadow} from './shadow'
import {SignPrompt} from './sign-prompt'

export function BottomSheet() {
  const {screen} = useDimensions()
  const {handleGesture, translateY} = useBottomSheetContext()
  const signRequest = useSelector(accountSelector.getSignRequest)

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
            {signRequest ? <SignPrompt /> : <Wallet />}
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
