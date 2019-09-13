import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {accountSelector} from 'src/redux/module/account'
import {entityAction, entityType, entityUtil} from 'src/redux/module/entity'
import {IHistoryManager} from 'src/redux/module/history/type'
import {tabHook} from 'src/redux/module/tab'

export function useHistoryManager(): IHistoryManager {
  const defaultAccountEntity = useSelector(
    accountSelector.getDefaultAccountEntity,
  ) as entityType.IAccount
  const dispatch = useDispatch()
  const {setLatestHistoryId} = tabHook.useTabManager()

  const addHistory = useCallback<IHistoryManager['addHistory']>(
    (tabId, title, url) => {
      const h = entityUtil.createHistory({
        accountAddress: defaultAccountEntity
          ? defaultAccountEntity.address
          : undefined,
        title,
        url,
      })
      dispatch(entityAction.setHistory(h))
      if (defaultAccountEntity) {
        dispatch(
          entityAction.setAccount({
            ...defaultAccountEntity,
            historyIds: [...defaultAccountEntity.historyIds, h.id],
          }),
        )
      }
      setLatestHistoryId(tabId, h.id)
    },
    [defaultAccountEntity, dispatch, setLatestHistoryId],
  )

  const removeHistory = useCallback<IHistoryManager['removeHistory']>(
    historyId => {
      dispatch(
        entityAction.setAccount({
          ...defaultAccountEntity,
          historyIds: defaultAccountEntity.historyIds.filter(
            (item: string) => item !== historyId,
          ),
        }),
      )
      dispatch(entityAction.removeHistory(historyId))
    },
    [defaultAccountEntity, dispatch],
  )

  return {
    addHistory,
    removeHistory,
  }
}
