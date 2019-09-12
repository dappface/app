import * as browserAction from 'src/redux/module/browser/action'
import * as browserHook from 'src/redux/module/browser/hook'
import {
  initialState as browserInitialState,
  reducer as browserReducer,
} from 'src/redux/module/browser/reducer'
import * as browserSelector from 'src/redux/module/browser/selector'
import * as browserType from 'src/redux/module/browser/type'

export {
  browserAction,
  browserHook,
  browserSelector,
  browserType,
  browserInitialState,
  browserReducer,
}
