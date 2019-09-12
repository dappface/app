import * as settingAction from 'src/redux/module/setting/action'
import * as settingHook from 'src/redux/module/setting/hook'
import {
  initialState as settingInitialState,
  reducer as settingReducer,
} from 'src/redux/module/setting/reducer'
import * as settingSelector from 'src/redux/module/setting/selector'
import * as settingType from 'src/redux/module/setting/type'

export {
  settingAction,
  settingHook,
  settingSelector,
  settingType,
  settingInitialState,
  settingReducer,
}
