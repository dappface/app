import * as React from 'react'
import * as rh from 'redux-react-hook'
import { resetRoot } from 'src/redux/reducer'

export const useNukeRedux = () => {
  const dispatch = rh.useDispatch()

  return React.useCallback(() => {
    dispatch(resetRoot())
  }, [])
}
