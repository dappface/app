import {useEffect, useMemo, useState} from 'react'
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
  const bottom = useMemo(() => (hasBezel ? 0 : 34), [hasBezel])

  return {
    top: 44,
    bottom,
  }
}

export function useBrowserNavigationHeight(): number {
  const {bottom} = useSafeAreaPosition()
  const value = useMemo(() => bottom + 48, [bottom])
  return value
}

export function useBottomSheetInitialTop(): number {
  const browserNavigationHeight = useBrowserNavigationHeight()
  const {screen: screenDimensions} = useDimensions()
  return screenDimensions.height - browserNavigationHeight
}

export interface IDimensions {
  screen: ScaledSize
  window: ScaledSize
}

export interface ISafeAreaPosition {
  top: number
  bottom: number
}
