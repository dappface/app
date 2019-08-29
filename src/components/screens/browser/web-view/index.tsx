import { initInjectedJavaScript } from 'dappface-inpage-provider'
import * as React from 'react'
import { NativeSyntheticEvent, NavState, View } from 'react-native'
import { WebView as NativeWebView } from 'react-native-webview'
import { WebViewSharedProps } from 'react-native-webview/lib/WebViewTypes'
import { useMappedState } from 'redux-react-hook'
import { Error } from 'src/components/screens/browser/web-view/error'
import { Home } from 'src/components/screens/browser/web-view/home'
import { useBrowserManager, useMessageChannelManager } from 'src/hooks'
import { IState } from 'src/redux/module'
import { browserHook } from 'src/redux/module/browser'
import { historyHook } from 'src/redux/module/history'
import { settingSelector } from 'src/redux/module/setting'
import { tabHook, tabType } from 'src/redux/module/tab'

export interface IProps {
  style?: any
  tab: tabType.ITab
}

export const WebView = ({ style, tab }: IProps) => {
  const { webViewRefs } = useBrowserManager()
  const mapState = React.useCallback(
    (state: IState) => ({
      remoteNodeUrl: settingSelector.getRemoteNodeUrlFactory(false)(state)
    }),
    []
  )
  const { remoteNodeUrl } = useMappedState(mapState)
  const { addHistory } = historyHook.useHistoryManager()
  const setOpenRequest = browserHook.useSetOpenRequest()
  const { setLoadingProgress, setNavigatables } = tabHook.useTabManager()
  const { onMessage } = useMessageChannelManager(tab.id)

  const onLoadEnd = async ({ nativeEvent }: NativeSyntheticEvent<NavState>) => {
    if (nativeEvent.code) {
      return
    }
    const url = nativeEvent.url as string
    const title = nativeEvent.title
    addHistory(tab.id, title, url)
    setOpenRequest()
  }

  const onNavigationStateChange = (e: NavState): void => {
    if (!e.loading) {
      return
    }
    setNavigatables(tab.id, {
      canGoBack: e.canGoBack as boolean,
      canGoForward: e.canGoForward as boolean
    })
  }

  const onLoadProgress: WebViewSharedProps['onLoadProgress'] = React.useCallback(
    ({ nativeEvent }) => {
      setLoadingProgress(tab.id, nativeEvent.progress)
    },
    [setLoadingProgress]
  )

  if (!tab.url) {
    return <Home style={style} />
  }

  return (
    <View style={style}>
      <NativeWebView
        allowFileAccess
        injectedJavaScript={initInjectedJavaScript(remoteNodeUrl)}
        mediaPlaybackRequiresUserAction
        onLoadEnd={onLoadEnd}
        onLoadProgress={onLoadProgress}
        onMessage={onMessage}
        onNavigationStateChange={onNavigationStateChange}
        ref={(webViewRefs.current as any)[tab.id]}
        renderError={error => <Error error={error} />}
        source={{ uri: tab.url }}
        sharedCookiesEnabled
      />
    </View>
  )
}
