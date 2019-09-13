import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import * as browserAction from 'src/redux/module/browser/action'
import * as browserType from 'src/redux/module/browser/type'

export function useSetOpenRequest() {
  const dispatch = useDispatch()

  return useCallback(
    (openRequest?: browserType.IOpenRequest): void => {
      dispatch(browserAction.setOpenRequest(openRequest))
    },
    [dispatch],
  )
}
