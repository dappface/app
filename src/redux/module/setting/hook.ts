import {useCallback} from 'react'
import {useDispatch} from 'redux-react-hook'
import * as settingAction from 'src/redux/module/setting/action'
import {ISettingManager} from 'src/redux/module/setting/type'

export const useSettingManager = (): ISettingManager => {
  const dispatch = useDispatch()

  const setCurrency: ISettingManager['setCurrency'] = useCallback(
    currency => {
      dispatch(settingAction.setCurrency(currency))
    },
    [dispatch],
  )

  const setNetwork: ISettingManager['setNetwork'] = useCallback(
    network => {
      dispatch(settingAction.setNetwork(network))
    },
    [dispatch],
  )

  const setSearchEngine: ISettingManager['setSearchEngine'] = useCallback(
    searchEngine => {
      dispatch(settingAction.setSearchEngine(searchEngine))
    },
    [dispatch],
  )

  return {
    setCurrency,
    setNetwork,
    setSearchEngine,
  }
}
