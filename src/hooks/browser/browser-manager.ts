import {
  createContext,
  createRef,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import {FlatList} from 'react-native'
import {WebView} from 'react-native-webview'
import {useSelector} from 'react-redux'
import {browserHook, browserSelector} from 'src/redux/module/browser'
import {tabHook, tabType} from 'src/redux/module/tab'
import validator from 'validator'

export function useBrowserManager() {
  return useContext(BrowserManagerContext) as IBrowserManager
}

export const BrowserManagerContext = createContext<IBrowserManager | undefined>(
  undefined,
)

export interface IBrowserManager {
  goBack: () => void
  goForward: () => void
  onReload: () => void
  onSearch: (str: string) => void
  onStopLoading: () => void
  openLink: (uri: string, openWithNewTab?: boolean) => void
  respondData: (tabId: string, callbackId: string, data: any) => void
  scrollTo: (i: number) => void
  tabListManager: tabType.ITabListManager
  webViewListRef: RefObject<FlatList<tabType.ITab>>
  webViewRefs: RefObject<{
    [key: string]: RefObject<WebView>
  }>
}

export function useInitializedBrowserManager(): IBrowserManager {
  const activeTabId = useSelector(browserSelector.getActiveTabId)
  const searchUrl = useSelector(browserSelector.getSearchUrl)
  const tabs = useSelector(browserSelector.getTabs)
  const {setLoadingProgress} = tabHook.useTabManager()
  const setOpenRequest = browserHook.useSetOpenRequest()

  const webViewListRef: IBrowserManager['webViewListRef'] = useRef(null)
  const webViewRefs: IBrowserManager['webViewRefs'] = useRef(
    tabs.reduce(
      (res, tab) => ({
        ...res,
        [tab.id]: createRef(),
      }),
      {},
    ),
  )

  const goBack: IBrowserManager['goBack'] = () => {
    if (!activeTabId || !webViewRefs.current) {
      return
    }
    const r = webViewRefs.current[activeTabId].current
    if (!r) {
      return
    }
    r.goBack()
  }

  const goForward: IBrowserManager['goForward'] = () => {
    if (!activeTabId || !webViewRefs.current) {
      return
    }
    const r = webViewRefs.current[activeTabId].current
    if (!r) {
      return
    }
    r.goForward()
  }

  const scrollTo: IBrowserManager['scrollTo'] = index => {
    if (!webViewListRef.current) {
      return
    }
    webViewListRef.current.scrollToIndex({index})
  }

  const tabListManager = tabHook.useTabListManager(scrollTo)

  const onReload: IBrowserManager['onReload'] = () => {
    if (!activeTabId || !webViewRefs.current) {
      return
    }
    const r = webViewRefs.current[activeTabId].current
    if (!r) {
      return
    }
    r.reload()
  }

  const queryToUrl = useCallback(
    (query: string) => {
      // random query words => ${searchUrl}/random+query+words
      // https://domain.com => https://domain.com
      // http://domain.com => http://domain.com
      // domain.com => https://domain.com
      // https://localhost => https://localhost
      // http://localhost => http://localhost
      // localhost => http://localhost

      const trimed = query.trim()
      if (/^http(s)?:\/\//.test(trimed)) {
        return trimed
      }

      if (/^localhost/.test(trimed)) {
        return `http://${trimed}`
      }

      if (validator.isURL(trimed)) {
        return `https://${trimed}`
      }

      const searchQuery = trimed.replace(' ', '+')
      return searchUrl + searchQuery
    },
    [searchUrl],
  )

  const openLink = useCallback<IBrowserManager['openLink']>(
    async (url, openWithNewTab = false) => {
      let tab
      if (openWithNewTab) {
        tab = await tabListManager.addTab()
      }
      setOpenRequest({
        tabId: tab ? tab.id : (activeTabId as string),
        url,
      })
    },
    [activeTabId, setOpenRequest, tabListManager],
  )

  const onSearch = useCallback<IBrowserManager['onSearch']>(
    str => {
      const u = queryToUrl(str)
      openLink(u)
    },
    [openLink, queryToUrl],
  )

  const onStopLoading: IBrowserManager['onStopLoading'] = () => {
    if (!activeTabId || !webViewRefs.current) {
      return
    }
    const r = webViewRefs.current[activeTabId].current
    if (!r) {
      return
    }
    setLoadingProgress(activeTabId, 0)
    r.stopLoading()
  }

  const respondData: IBrowserManager['respondData'] = (
    tabId,
    callbackId,
    data,
  ) => {
    if (!webViewRefs.current) {
      return
    }
    const r = webViewRefs.current[tabId].current
    if (!r) {
      return
    }
    r.injectJavaScript(`
      if (window.dappface) {
        window.dappface.respondData('${callbackId}', '${JSON.stringify(data)}');
      };
      true;
    `)
  }

  useEffect(() => {
    // @ts-ignore
    webViewRefs.current = tabs.reduce(
      (res, tab) => ({
        ...res,
        [tab.id]: createRef(),
      }),
      {},
    )
  }, [tabs, tabs.length])

  return {
    goBack,
    goForward,
    onReload,
    onSearch,
    onStopLoading,
    openLink,
    respondData,
    scrollTo,
    tabListManager,
    webViewListRef,
    webViewRefs,
  }
}
