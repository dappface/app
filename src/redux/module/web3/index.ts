import * as web3Action from 'src/redux/module/web3/action'
import * as web3Hook from 'src/redux/module/web3/hook'
import {
  initialState as web3InitialState,
  reducer as web3Reducer
} from 'src/redux/module/web3/reducer'
import * as web3Selector from 'src/redux/module/web3/selector'
import * as web3Type from 'src/redux/module/web3/type'

export {
  web3Action,
  web3Hook,
  web3Selector,
  web3Type,
  web3InitialState,
  web3Reducer
}
