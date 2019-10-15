import React, {useRef} from 'react'
import {StyleSheet} from 'react-native'
import {PanGestureHandler, State} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

import {Size} from 'src/const'
import {
  useBottomSheetContext,
  useDimensions,
  useBottomAppBarInitialTop,
} from 'src/hooks'
import {Shadow} from './shadow'

const {
  abs,
  add,
  block,
  cond,
  Clock,
  clockRunning,
  eq,
  event,
  lessThan,
  multiply,
  not,
  set,
  spring,
  SpringUtils,
  startClock,
  stopClock,
  sub,
  Value,
} = Animated

export function BottomSheet() {
  const initialPositionY = useBottomAppBarInitialTop()
  const {screen} = useDimensions()
  const snapPoints = [initialPositionY, screen.height / 2, 0]
  const {positionY} = useBottomSheetContext()
  const {clock, dragY, dragVY, gestureState} = useRef({
    clock: new Clock(),
    dragY: new Value(-1),
    dragVY: new Value(-1),
    gestureState: new Value(-2),
  }).current

  const handleGesture = useRef(
    event([
      {
        nativeEvent: {
          translationY: dragY,
          velocityY: dragVY,
          state: gestureState,
        },
      },
    ]),
  ).current

  const newPositionY = add(positionY, dragY)
  const translateY = useRef(
    cond(
      eq(gestureState, State.ACTIVE),
      [stopClock(clock), newPositionY],
      cond(
        eq(gestureState, State.END),
        [
          set(positionY, newPositionY),
          runSpring(
            clock,
            positionY,
            snapPoint(positionY, dragVY, snapPoints),
            dragVY,
          ),
          positionY,
        ],
        positionY,
      ),
    ),
  ).current

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
    borderRadius: Size.BORDER_RADIUS,
  },
})

function snapPoint(
  position: Animated.Value<number>,
  dragV: Animated.Value<number>,
  snapPoints: number[],
): Animated.Node<number> {
  const sortedPoints = snapPoints
    .sort((p1, p2) => p1 - p2)
    .map(p => new Value(p))
  const destination = add(position, multiply(0.4, dragV))
  const diffs = sortedPoints.map(value => abs(sub(destination, value)))

  function currentSnapPoint(i = 0): Animated.Node<number> {
    return i === sortedPoints.length - 1
      ? block([sortedPoints[i]])
      : cond(
          lessThan(diffs[i], diffs[i + 1]),
          sortedPoints[i],
          currentSnapPoint(i + 1),
        )
  }

  return currentSnapPoint()
}

function runSpring(
  clock: Animated.Clock,
  value: Animated.Value<number>,
  dest: number | Animated.Node<number>,
  velocity: Animated.Value<number>,
) {
  const state: Animated.SpringState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }

  const config: Animated.SpringConfig = {
    ...SpringUtils.makeDefaultConfig(),
    damping: new Value(30),
    mass: new Value(1),
    stiffness: new Value(300),
  }

  return block([
    cond(not(clockRunning(clock)), [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue as Animated.Value<number>, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    set(value, state.position),
  ])
}
