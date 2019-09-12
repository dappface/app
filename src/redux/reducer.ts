import {combineReducers} from 'redux'
import {persistReducer, Transform} from 'redux-persist'
import FSStorage from 'redux-persist-fs-storage'
import {IState} from 'src/redux/module'
import {accountInitialState, accountReducer} from 'src/redux/module/account'
import {browserInitialState, browserReducer} from 'src/redux/module/browser'
import {entityInitialState, entityReducer} from 'src/redux/module/entity'
import {settingInitialState, settingReducer} from 'src/redux/module/setting'
import {uiInitialState, uiReducer} from 'src/redux/module/ui'
import {web3InitialState, web3Reducer} from 'src/redux/module/web3'

const initialState: IState = {
  account: accountInitialState,
  browser: browserInitialState,
  entity: entityInitialState,
  setting: settingInitialState,
  ui: uiInitialState,
  web3: web3InitialState,
}

export const configurePersistedReducer = (encryptor: Transform<{}, {}>) => {
  const appReducer = combineReducers({
    account: accountReducer,
    browser: browserReducer,
    entity: entityReducer,
    setting: settingReducer,
    ui: uiReducer,
    web3: web3Reducer,
  })

  const rootReducer = (
    state: IState = initialState,
    action: Actions,
  ): IState => {
    switch (action.type) {
      case ActionType.REST_ROOT:
        return initialState
      default:
        return appReducer(state, action)
    }
  }

  const rootPersistConfig = {
    key: 'root',
    keyPrefix: '',
    storage: FSStorage(),
    transform: [encryptor],
  }

  return persistReducer(rootPersistConfig, rootReducer)
}

enum ActionType {
  REST_ROOT = 'dappface/root/RESET_ROOT',
}

type Actions = IResetRoot

interface IResetRoot {
  type: ActionType.REST_ROOT
}

export const resetRoot = (): IResetRoot => ({
  type: ActionType.REST_ROOT,
})
