import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {resetRoot} from 'src/redux/reducer'

export function useNukeRedux() {
  const dispatch = useDispatch()

  return useCallback((): void => {
    dispatch(resetRoot())
  }, [dispatch])
}
