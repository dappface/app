import {useEffect, useState} from 'react'
import {Dimensions, ScaledSize} from 'react-native'
import {useHasBezel} from './device-info'

export function useDimensions(): IDimensions {
  const [dimensions, setDimensions] = useState({
    screen: Dimensions.get('window'),
    window: Dimensions.get('screen'),
  })

  function onChange({window, screen}: IDimensions): void {
    setDimensions({window, screen})
  }

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)

    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  return dimensions
}

export function useSafeAreaPosition(): ISafeAreaPosition {
  const hasBezel = useHasBezel()

  return {
    top: 44,
    bottom: hasBezel ? 0 : 34,
  }
}

export function useBottomAppBarHeight(): number {
  const safeAreaPosition = useSafeAreaPosition()
  return safeAreaPosition.bottom + 48
}

export function useBottomAppBarInitialTop(): number {
  const bottomAppBarHeight = useBottomAppBarHeight()
  const {screen: screenDimensions} = useDimensions()
  return screenDimensions.height - bottomAppBarHeight
}

export interface IDimensions {
  screen: ScaledSize
  window: ScaledSize
}

export interface ISafeAreaPosition {
  top: number
  bottom: number
}
