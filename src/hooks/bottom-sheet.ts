import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {State} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

import {useBottomAppBarInitialTop, useDimensions} from './dimensions'

const {
  abs,
  add,
  block,
  call,
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

export function useBottomSheetContext() {
  return useContext(BottomSheetContext) as IBottomSheetContext
}

export const BottomSheetContext = createContext<
  IBottomSheetContext | undefined
>(undefined)

interface IBottomSheetContext {
  closeBottomSheet: () => void
  handleGesture: (...args: any[]) => void
  isOpen: boolean
  openBottomSheet: () => void
  translateY: Animated.Node<number>
}

export function useInitialBottomSheetContext(): IBottomSheetContext {
  const initialPositionY = useBottomAppBarInitialTop()
  const {screen} = useDimensions()
  const snapPoints = [initialPositionY, screen.height / 2, 0]

  const positionY = useRef(new Value(initialPositionY))
  const manualSnapPoint = useRef(new Value<number>(-1))

  const {afterDragClock, manualSnapClock, dragY, dragVY, gestureState} = useRef(
    {
      afterDragClock: new Clock(),
      manualSnapClock: new Clock(),
      dragY: new Value(-1),
      dragVY: new Value(-1),
      gestureState: new Value(-2),
    },
  ).current

  useEffect(() => {
    positionY.current.setValue(initialPositionY)
  }, [initialPositionY])

  const [isOpen, setIsOpen] = useState(false)

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

  const newPositionY = useRef(add(positionY.current, dragY)).current
  const translateY = useRef(
    cond(
      lessThan(manualSnapPoint.current, 0),
      cond(
        eq(gestureState, State.ACTIVE),
        [stopClock(afterDragClock), stopClock(manualSnapClock), newPositionY],
        cond(
          eq(gestureState, State.END),
          [
            set(positionY.current, newPositionY),
            runSpring(
              afterDragClock,
              positionY.current,
              snapPoint(positionY.current, dragVY, snapPoints),
              dragVY,
            ),
            positionY.current,
          ],
          positionY.current,
        ),
      ),
      [
        stopClock(afterDragClock),
        runSpring(
          manualSnapClock,
          positionY.current,
          manualSnapPoint.current,
          dragVY,
        ),
        cond(
          eq(positionY.current, manualSnapPoint.current),
          set(manualSnapPoint.current, -1),
        ),
        positionY.current,
      ],
    ),
  ).current

  const isOpenNode = lessThan(translateY, initialPositionY - 4)
  const isOpenValue = new Value(0)

  Animated.useCode(
    cond(
      isOpenNode,
      cond(eq(isOpenValue, 0), [
        set(isOpenValue, 1),
        call([], () => {
          setIsOpen(true)
        }),
      ]),
      cond(eq(isOpenValue, 1), [
        set(isOpenValue, 0),
        call([], () => {
          setIsOpen(false)
        }),
      ]),
    ),
    [isOpenNode],
  )

  const snapTo = useCallback(
    (index: number) => {
      manualSnapPoint.current.setValue(snapPoints[index])
    },
    [snapPoints],
  )

  const closeBottomSheet = useCallback(() => {
    snapTo(0)
  }, [snapTo])

  const openBottomSheet = useCallback(() => {
    snapTo(2)
  }, [snapTo])

  return {
    closeBottomSheet,
    handleGesture,
    isOpen,
    openBottomSheet,
    translateY,
  }
}

function snapPoint(
  position: Animated.Value<number>,
  dragV: Animated.Value<number>,
  snapPoints: number[],
): Animated.Node<number> {
  const sortedPoints = [...snapPoints]
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
