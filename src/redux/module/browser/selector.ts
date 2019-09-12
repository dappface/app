import {createSelector} from 'reselect'
import {SearchEngine, SearchEngines} from 'src/const'
import {IState as IAllState} from 'src/redux/module'
import {accountSelector} from 'src/redux/module/account'
import {bookmarkSelector} from 'src/redux/module/bookmark'
import * as browserType from 'src/redux/module/browser/type'
import {entitySelector, entityType} from 'src/redux/module/entity'
import {settingSelector} from 'src/redux/module/setting'
import {tabType} from 'src/redux/module/tab'

export const getActiveTabId = (state: IAllState): string | undefined =>
  state.browser.activeTabId

export const getTabIds = (state: IAllState): string[] => state.browser.tabIds

export const getOpenRequest = (
  state: IAllState,
): browserType.IOpenRequest | undefined => state.browser.openRequest

export const getActiveTabIndex = createSelector(
  getActiveTabId,
  getTabIds,
  (activeTabId: string | undefined, tabIds: string[]): number =>
    activeTabId ? tabIds.indexOf(activeTabId) : -1,
)

export const getActiveTab = createSelector(
  getActiveTabId,
  entitySelector.getTabs,
  (
    activeTabId: string | undefined,
    tabs: entityType.ITabs,
  ): entityType.ITab | undefined =>
    activeTabId ? tabs[activeTabId] : undefined,
)

export const getTabs = createSelector(
  getTabIds,
  entitySelector.getTabs,
  entitySelector.getHistories,
  getOpenRequest,
  (
    tabIds: string[],
    tabs: entityType.ITabs,
    histories: entityType.IHistories,
    openRequest?: browserType.IOpenRequest,
  ): tabType.ITab[] =>
    tabIds.map(id => {
      const t = tabs[id]
      const h = t.latestHistoryId ? histories[t.latestHistoryId] : undefined
      const url = h ? h.url : undefined
      return {
        id: t.id,
        isLoading: ![0, 1].includes(t.loadingProgress),
        title: h ? h.title || h.url : undefined,
        url: !!openRequest && openRequest.tabId === id ? openRequest.url : url,
      }
    }),
)

export const getCanGoBack = createSelector(
  getActiveTab,
  (activeTab: entityType.ITab | undefined): boolean =>
    activeTab ? activeTab.canGoBack : false,
)

export const getCanGoForward = createSelector(
  getActiveTab,
  (activeTab: entityType.ITab | undefined): boolean =>
    activeTab ? activeTab.canGoForward : false,
)

export const getUrl = createSelector(
  getActiveTabIndex,
  getTabs,
  (i: number, tabs: tabType.ITab[]): string | undefined =>
    i >= 0 ? tabs[i].url : undefined,
)

export const getBookmarkStatusFactory = (isOpen: boolean) =>
  createSelector(
    getIsLoading,
    accountSelector.getIsAccountExist,
    getIsBookmarked,
    getUrl,
    (
      isLoading: boolean,
      isAccountExist: boolean,
      isBookmarked: boolean,
      url: string | undefined,
    ): browserType.BookmarkStatus => {
      if (!isAccountExist || isOpen || isLoading || !url) {
        return browserType.BookmarkStatus.Disabled
      }
      return isBookmarked
        ? browserType.BookmarkStatus.Bookmarked
        : browserType.BookmarkStatus.NotBookmarked
    },
  )

export const getIsBookmarked = createSelector(
  bookmarkSelector.getBookmarks,
  getUrl,
  (bookmarks: entityType.IBookmark[], url?: string): boolean => {
    const isBookmarked = bookmarks.reduce((r, item) => {
      if (!item || !url) {
        return r
      }
      return item.url === url || r
    }, false)
    return isBookmarked
  },
)

export const getLoadingProgress = createSelector(
  getActiveTab,
  (activeTab?: entityType.ITab): number =>
    activeTab && activeTab.loadingProgress ? activeTab.loadingProgress : 1,
)

export const getIsLoading = createSelector(
  getLoadingProgress,
  (loadingProgress: number): boolean => loadingProgress !== 1,
)

export const getSearchUrl = createSelector(
  settingSelector.getSearchEngine,
  (searchEngine: SearchEngine): string => SearchEngines[searchEngine].url,
)

export const getShowAddressBar = createSelector(
  getUrl,
  (url?: string): boolean => !!url,
)
