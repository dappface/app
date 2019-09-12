import {useCallback} from 'react'
import {useDispatch} from 'redux-react-hook'
import * as browserAction from 'src/redux/module/browser/action'
import * as browserType from 'src/redux/module/browser/type'

export const useSetOpenRequest = () => {
  const dispatch = useDispatch()

  return useCallback(
    (openRequest?: browserType.IOpenRequest) => {
      dispatch(browserAction.setOpenRequest(openRequest))
    },
    [dispatch],
  )
}
