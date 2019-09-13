import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import * as web3Action from 'src/redux/module/web3/action'

export function useSetLatestBlockNumber() {
  const dispatch = useDispatch()
  const cb = useCallback(
    (latestBlockNumber: number): void => {
      dispatch(web3Action.setLatestBlockNumber(latestBlockNumber))
    },
    [dispatch],
  )
  return cb
}
