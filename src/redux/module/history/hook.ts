import { useCallback } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'
import { IState } from 'src/redux/module'
import { accountSelector } from 'src/redux/module/account'
import { entityAction, entityType, entityUtil } from 'src/redux/module/entity'
import { IHistoryManager } from 'src/redux/module/history/type'
import { tabHook } from 'src/redux/module/tab'

export function useHistoryManager(): IHistoryManager {
  const mapState = useCallback(
    (state: IState) => ({
      defaultAccountEntity: accountSelector.getDefaultAccountEntity(
        state
      ) as entityType.IAccount
    }),
    []
  )
  const { defaultAccountEntity } = useMappedState(mapState)
  const dispatch = useDispatch()
  const { setLatestHistoryId } = tabHook.useTabManager()

  const addHistory = useCallback<IHistoryManager['addHistory']>(
    (tabId, title, url) => {
      const h = entityUtil.createHistory({
        accountAddress: defaultAccountEntity
          ? defaultAccountEntity.address
          : undefined,
        title,
        url
      })
      dispatch(entityAction.setHistory(h))
      if (defaultAccountEntity) {
        dispatch(
          entityAction.setAccount({
            ...defaultAccountEntity,
            historyIds: [...defaultAccountEntity.historyIds, h.id]
          })
        )
      }
      setLatestHistoryId(tabId, h.id)
    },
    [defaultAccountEntity, setLatestHistoryId]
  )

  const removeHistory = useCallback<IHistoryManager['removeHistory']>(
    historyId => {
      dispatch(
        entityAction.setAccount({
          ...defaultAccountEntity,
          historyIds: defaultAccountEntity.historyIds.filter(
            (item: string) => item !== historyId
          )
        })
      )
      dispatch(entityAction.removeHistory(historyId))
    },
    [defaultAccountEntity]
  )

  return {
    addHistory,
    removeHistory
  }
}
