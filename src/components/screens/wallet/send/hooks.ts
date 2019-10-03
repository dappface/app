import BN from 'bignumber.js'
import {useEffect, useMemo, useState} from 'react'

import {gasStation} from 'src/utils'
import {HelperTextType} from './shared'

interface IGasInfo {
  average: number
  fast: number
  safeLow: number
}

interface IGasPriceInfo {
  helperText: HelperTextType
  recommendedGasPrice: string
}

export const useGasPriceInfo = (): IGasPriceInfo => {
  const [gasInfo, setGasInfo] = useState<IGasInfo | null>(null)

  const recommendedGasPrice = useMemo(
    () => (gasInfo ? new BN(gasInfo.safeLow).dividedBy(10).toString() : '41'),
    [gasInfo],
  )

  const helperText = useMemo<HelperTextType>(() => {
    if (!gasInfo) {
      return 'Fetching recommendations'
    }
    const safeLow = new BN(gasInfo.safeLow).dividedBy(10).toString()
    const average = new BN(gasInfo.average).dividedBy(10).toString()
    const fast = new BN(gasInfo.fast).dividedBy(10).toString()
    return `Recommendations (\
Safe Lowest: ${safeLow} Gwei, \
Standard: ${average} Gwei, \
Fast: ${fast} Gwei)`
  }, [gasInfo])

  useEffect(() => {
    ;(async () => {
      try {
        const info = await gasStation.getGasInfo()
        setGasInfo(info)
      } catch (error) {
        // [TODO]
      }
    })()
  }, [])

  return {
    helperText,
    recommendedGasPrice,
  }
}
