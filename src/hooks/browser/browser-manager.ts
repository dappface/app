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
  postMessageData: (
    tabId: string,
    data: {id: string; jsonrpc: '2.0'; result: any},
  ) => void
  scrollTo: (i: number) => void
  tabListManager: tabType.ITabListManager
  webViewListRef: RefObject<FlatList<tabType.ITab>>
  webViewRefs: Map<string, WebView>
}

export function useInitializedBrowserManager(): IBrowserManager {
  const activeTabId = useSelector(browserSelector.getActiveTabId)
  const searchUrl = useSelector(browserSelector.getSearchUrl)
  const tabs = useSelector(browserSelector.getTabs)
  const {setLoadingProgress} = tabHook.useTabManager()
  const setOpenRequest = browserHook.useSetOpenRequest()

  const webViewListRef: IBrowserManager['webViewListRef'] = useRef(null)
  const webViewRefs = useRef(new Map()).current

  const goBack = useCallback<IBrowserManager['goBack']>(() => {
    if (!activeTabId) {
      return
    }
    const r = webViewRefs.get(activeTabId)
    if (!r) {
      return
    }
    r.goBack()
  }, [activeTabId])

  const goForward = useCallback<IBrowserManager['goForward']>(() => {
    if (!activeTabId) {
      return
    }
    const r = webViewRefs.get(activeTabId)
    if (!r) {
      return
    }
    r.goForward()
  }, [activeTabId])

  const scrollTo = useCallback<IBrowserManager['scrollTo']>(index => {
    if (!webViewListRef.current) {
      return
    }
    webViewListRef.current.scrollToIndex({index})
  }, [])

  const tabListManager = tabHook.useTabListManager(scrollTo)

  const onReload = useCallback<IBrowserManager['onReload']>(() => {
    if (!activeTabId) {
      return
    }
    const r = webViewRefs.get(activeTabId)
    if (!r) {
      return
    }
    r.reload()
  }, [activeTabId])

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
    (url, openWithNewTab = false) => {
      let tab
      if (openWithNewTab) {
        tab = tabListManager.addTab()
      }
      setOpenRequest({
        tabId: tab ? tab.id : (activeTabId as string),
        url,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTabId, setOpenRequest, tabListManager.addTab],
  )

  const onSearch = useCallback<IBrowserManager['onSearch']>(
    str => {
      const u = queryToUrl(str)
      openLink(u)
    },
    [openLink, queryToUrl],
  )

  const onStopLoading = useCallback<IBrowserManager['onStopLoading']>(() => {
    if (!activeTabId) {
      return
    }
    const r = webViewRefs.get(activeTabId)
    if (!r) {
      return
    }
    setLoadingProgress(activeTabId, 0)
    r.stopLoading()
  }, [activeTabId, setLoadingProgress])

  const postMessageData = useCallback<IBrowserManager['postMessageData']>(
    (tabId, data) => {
      const ref = webViewRefs.get(tabId)
      if (!ref) {
        return
      }

      const message = JSON.stringify(data)
      console.log(message)

      ref.injectJavaScript(`
        if (window.ethereum) {
          window.ethereum.postMessage('${message}');
        }
        true;
      `)
    },
    [],
  )

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
    postMessageData,
    scrollTo,
    tabListManager,
    webViewListRef,
    webViewRefs,
  }
}
