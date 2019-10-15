import {
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useRef,
} from 'react'
import Animated from 'react-native-reanimated'

export function useBottomSheetContext() {
  return useContext(BottomSheetContext) as IBottomSheetContext
}

export const BottomSheetContext = createContext<
  IBottomSheetContext | undefined
>(undefined)

interface IBottomSheetContext {
  bottomSheetRef: MutableRefObject<Animated.View>
  closeBottomSheet: () => void
  openBottomSheet: () => void
}

export function useInitialBottomSheetContext(): IBottomSheetContext {
  const bottomSheetRef = useRef<Animated.View>() as MutableRefObject<
    Animated.View
  >

  const closeBottomSheet = useCallback(() => {}, [])

  const openBottomSheet = useCallback(() => {}, [])

  return {
    bottomSheetRef,
    closeBottomSheet,
    openBottomSheet,
  }
}
