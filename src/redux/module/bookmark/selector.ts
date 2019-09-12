import {createSelector} from 'reselect'
import {accountSelector} from 'src/redux/module/account'
import {entitySelector, entityType} from 'src/redux/module/entity'
import {historySelector} from 'src/redux/module/history'

export const getBookmarks = createSelector(
  accountSelector.getDefaultAccountEntity,
  entitySelector.getBookmarks,
  (
    defaultAccountEntity: entityType.IAccount | undefined,
    bookmarks: entityType.IBookmarks,
  ): entityType.IBookmark[] =>
    defaultAccountEntity
      ? defaultAccountEntity.bookmarkIds.map((id: string) => bookmarks[id])
      : [],
)

export const getActiveBookmark = createSelector(
  getBookmarks,
  historySelector.getActiveHistory,
  (
    bookmarks: entityType.IBookmark[],
    activeHistory?: entityType.IHistory,
  ): entityType.IBookmark | undefined => {
    if (!activeHistory) {
      return
    }
    return activeHistory
      ? bookmarks.find(
          (item: entityType.IBookmark) => item.url === activeHistory.url,
        )
      : undefined
  },
)
