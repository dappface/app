import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {accountSelector} from 'src/redux/module/account'
import * as bookmarkSelector from 'src/redux/module/bookmark/selector'
import * as bookmarkType from 'src/redux/module/bookmark/type'
import {entityAction, entityType, entityUtil} from 'src/redux/module/entity'
import {historySelector} from 'src/redux/module/history'

export function useBookmarkManager(): bookmarkType.IBookmarkManager {
  const activeBookmark = useSelector(bookmarkSelector.getActiveBookmark)
  const activeHistory = useSelector(
    historySelector.getActiveHistory,
  ) as entityType.IHistory
  const defaultAccountEntity = useSelector(
    accountSelector.getDefaultAccountEntity,
  ) as entityType.IAccount
  const dispatch = useDispatch()

  const addBookmark = useCallback(() => {
    const bookmark = entityUtil.createBookmark({
      accountAddress: defaultAccountEntity.address,
      title: activeHistory.title,
      url: activeHistory.url,
    })
    dispatch(entityAction.setBookmark(bookmark))
    dispatch(
      entityAction.setAccount({
        ...defaultAccountEntity,
        bookmarkIds: [...defaultAccountEntity.bookmarkIds, bookmark.id],
      }),
    )
  }, [defaultAccountEntity, activeHistory, dispatch])

  const removeBookmark = useCallback<
    bookmarkType.IBookmarkManager['removeBookmark']
  >(
    bookmarkId => {
      dispatch(
        entityAction.setAccount({
          ...defaultAccountEntity,
          bookmarkIds: defaultAccountEntity.bookmarkIds.filter(
            (id: string) => id !== bookmarkId,
          ),
        }),
      )
      dispatch(entityAction.removeBookmark(bookmarkId))
    },
    [defaultAccountEntity, dispatch],
  )

  const toggleBookmark = useCallback<
    bookmarkType.IBookmarkManager['toggleBookmark']
  >(() => {
    if (!activeHistory) {
      return
    }

    if (activeBookmark) {
      removeBookmark(activeBookmark.id)
      return
    }

    addBookmark()
  }, [activeHistory, activeBookmark, removeBookmark, addBookmark])

  return {
    removeBookmark,
    toggleBookmark,
  }
}
