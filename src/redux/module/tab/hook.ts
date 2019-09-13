import {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {IBrowserManager, useDimensions} from 'src/hooks'
import {browserAction, browserSelector} from 'src/redux/module/browser'
import {entityAction, entitySelector, entityUtil} from 'src/redux/module/entity'
import {ITabListManager, ITabManager} from 'src/redux/module/tab/type'

export function useTabListManager(
  scrollTo: IBrowserManager['scrollTo'],
): ITabListManager {
  const [haltScrollCB, setHaltScrollCB] = useState(false)
  const {
    window: {width},
  } = useDimensions()
  const dispatch = useDispatch()
  const activeTabIndex = useSelector(browserSelector.getActiveTabIndex)
  const tabIds = useSelector(browserSelector.getTabIds)
  const tabs = useSelector(browserSelector.getTabs)

  const addTab = useCallback<ITabListManager['addTab']>(() => {
    const t = entityUtil.createTab()
    const i = activeTabIndex + 1
    const newTabIds = [...tabIds.slice(0, i), t.id, ...tabIds.slice(i)]

    dispatch(entityAction.setTab(t))
    dispatch(browserAction.setTabIds(newTabIds))
    setTimeout(() => {
      scrollTo(i)
      setTimeout(() => {
        dispatch(browserAction.setActiveTabId(t.id))
      }, 300)
    }, 100)

    return t
  }, [activeTabIndex, dispatch, scrollTo, tabIds])

  const onMomentumScrollEnd = useCallback<
    ITabListManager['onMomentumScrollEnd']
  >(
    e => {
      if (haltScrollCB) {
        setHaltScrollCB(false)
        return
      }
      const offsetX = e.nativeEvent.contentOffset.x
      const newIndex = offsetX / width
      if (newIndex % 1 !== 0) {
        return
      }
      dispatch(browserAction.setActiveTabId(tabs[newIndex].id))
    },
    [haltScrollCB, width, dispatch, tabs],
  )

  const removeFactory = useCallback<ITabListManager['removeFactory']>(
    tabId => () => {
      setHaltScrollCB(true)

      // When there are some tabs on the right
      if (activeTabIndex < tabIds.length - 1) {
        const newIndex = activeTabIndex + 1
        scrollTo(newIndex)
        setTimeout(() => {
          dispatch(browserAction.setActiveTabId(tabIds[newIndex]))
          setTimeout(() => {
            dispatch(
              browserAction.setTabIds(tabIds.filter(item => item !== tabId)),
            )
            dispatch(entityAction.removeTab(tabId))
          }, 100)
        }, 300)
        return
      }

      // When there are no tabs on the right but on the left
      if (activeTabIndex !== 0) {
        const newIndex = activeTabIndex - 1
        scrollTo(newIndex)
        setTimeout(() => {
          dispatch(browserAction.setActiveTabId(tabIds[newIndex]))
          dispatch(
            browserAction.setTabIds(tabIds.filter(item => item !== tabId)),
          )
          dispatch(entityAction.removeTab(tabId))
        }, 400)
        return
      }

      // When there are tabs neither on the right or left
      dispatch(browserAction.setActiveTabId())
      dispatch(browserAction.setTabIds(tabIds.filter(item => item !== tabId)))
      dispatch(entityAction.removeTab(tabId))
    },
    [activeTabIndex, dispatch, scrollTo, tabIds],
  )

  const selectFactory = useCallback<ITabListManager['selectFactory']>(
    tabId => () => {
      dispatch(browserAction.setActiveTabId(tabId))
      const i = tabIds.indexOf(tabId)
      scrollTo(i)
    },
    [dispatch, scrollTo, tabIds],
  )

  return {
    addTab,
    onMomentumScrollEnd,
    removeFactory,
    selectFactory,
  }
}

export function useTabManager(): ITabManager {
  const tabs = useSelector(entitySelector.getTabs)
  const dispatch = useDispatch()

  const setNavigatables = useCallback<ITabManager['setNavigatables']>(
    (tabId, params) => {
      const t = tabs[tabId]
      dispatch(
        entityAction.setTab({
          ...t,
          canGoBack: params.canGoBack,
          canGoForward: params.canGoForward,
        }),
      )
    },
    [dispatch, tabs],
  )

  const setLatestHistoryId = useCallback<ITabManager['setLatestHistoryId']>(
    (tabId, latestHistoryId) => {
      const t = tabs[tabId]
      dispatch(
        entityAction.setTab({
          ...t,
          latestHistoryId,
        }),
      )
    },
    [dispatch, tabs],
  )

  const setLoadingProgress = useCallback<ITabManager['setLoadingProgress']>(
    (tabId, loadingProgress) => {
      const t = tabs[tabId]
      dispatch(
        entityAction.setTab({
          ...t,
          loadingProgress,
        }),
      )
    },
    [dispatch, tabs],
  )

  return {
    setLatestHistoryId,
    setLoadingProgress,
    setNavigatables,
  }
}
