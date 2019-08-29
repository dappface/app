import { accountType } from 'src/redux/module/account'
import { browserType } from 'src/redux/module/browser'
import { entityType } from 'src/redux/module/entity'
import { settingType } from 'src/redux/module/setting'
import { uiType } from 'src/redux/module/ui'
import { web3Type } from 'src/redux/module/web3'

export interface IState {
  account: accountType.IState
  browser: browserType.IState
  entity: entityType.IState
  setting: settingType.IState
  ui: uiType.IState
  web3: web3Type.IState
}
