import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import Animated from 'react-native-reanimated'

import {useBottomAppBarInitialTop} from './dimensions'

export function useBottomSheetContext() {
  return useContext(BottomSheetContext) as IBottomSheetContext
}

export const BottomSheetContext = createContext<
  IBottomSheetContext | undefined
>(undefined)

interface IBottomSheetContext {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  positionY: Animated.Value<number>
  closeBottomSheet: () => void
  openBottomSheet: () => void
}

export function useInitialBottomSheetContext(): IBottomSheetContext {
  const initialPositionY = useBottomAppBarInitialTop()
  const positionY = useRef(new Animated.Value(initialPositionY))
  useEffect(() => {
    positionY.current = new Animated.Value(initialPositionY)
  }, [initialPositionY])

  const [isOpen, setIsOpen] = useState(false)

  const closeBottomSheet = useCallback(() => {
    console.log('[TODO] closeBottomSheet')
  }, [])

  const openBottomSheet = useCallback(() => {
    console.log('[TODO] openBottomSheet')
  }, [])

  return {
    isOpen,
    setIsOpen,
    positionY: positionY.current,
    closeBottomSheet,
    openBottomSheet,
  }
}
