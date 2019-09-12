import {useCallback} from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook'
import {IState as IAllState} from 'src/redux/module'
import {accountSelector} from 'src/redux/module/account'
import * as bookmarkSelector from 'src/redux/module/bookmark/selector'
import * as bookmarkType from 'src/redux/module/bookmark/type'
import {entityAction, entityType, entityUtil} from 'src/redux/module/entity'
import {historySelector} from 'src/redux/module/history'

export const useBookmarkManager = (): bookmarkType.IBookmarkManager => {
  const mapState = useCallback(
    (state: IAllState) => ({
      activeBookmark: bookmarkSelector.getActiveBookmark(state),
      activeHistory: historySelector.getActiveHistory(
        state,
      ) as entityType.IHistory,
      defaultAccountEntity: accountSelector.getDefaultAccountEntity(
        state,
      ) as entityType.IAccount,
    }),
    [],
  )
  const {activeBookmark, activeHistory, defaultAccountEntity} = useMappedState(
    mapState,
  )
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
  }, [defaultAccountEntity, activeHistory.title, activeHistory.url, dispatch])

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
    activeBookmark ? removeBookmark(activeBookmark.id) : addBookmark()
  }, [activeHistory, activeBookmark, removeBookmark, addBookmark])

  return {
    removeBookmark,
    toggleBookmark,
  }
}
