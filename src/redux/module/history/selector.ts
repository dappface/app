import { createSelector } from 'reselect'
import { accountSelector } from 'src/redux/module/account'
import * as browserSelector from 'src/redux/module/browser/selector'
import { entitySelector, entityType } from 'src/redux/module/entity'

export const getHistories = createSelector(
  accountSelector.getDefaultAccountEntity,
  entitySelector.getHistories,
  (
    defaultAccountEntity: entityType.IAccount | undefined,
    histories: entityType.IHistories
  ): entityType.IHistory[] =>
    defaultAccountEntity
      ? defaultAccountEntity.historyIds.map(item => histories[item])
      : []
)

export const getActiveHistory = createSelector(
  entitySelector.getHistories,
  browserSelector.getActiveTab,
  (
    histories: entityType.IHistories,
    activeTab?: entityType.ITab
  ): entityType.IHistory | undefined =>
    activeTab && activeTab.latestHistoryId
      ? histories[activeTab.latestHistoryId]
      : undefined
)
