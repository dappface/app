import Injectable from 'lib/index.json'
import React, {useCallback} from 'react'
import {View} from 'react-native'
import {WebView as NativeWebView} from 'react-native-webview'
import {
  WebViewError,
  WebViewSharedProps,
} from 'react-native-webview/lib/WebViewTypes'
import {useSelector} from 'react-redux'
import {Error} from 'src/components/screens/browser/web-view/error'
import {Home} from 'src/components/screens/browser/web-view/home'
import {useBrowserManager, useMessageManager} from 'src/hooks'
import {browserHook} from 'src/redux/module/browser'
import {historyHook} from 'src/redux/module/history'
import {settingSelector} from 'src/redux/module/setting'
import {tabHook, tabType} from 'src/redux/module/tab'

export interface IProps {
  style?: any
  tab: tabType.ITab
}

export function WebView({style, tab}: IProps) {
  const {webViewRefs} = useBrowserManager()
  const remoteNodeUrl = useSelector(
    settingSelector.getRemoteNodeUrlFactory(false),
  )
  const {addHistory} = historyHook.useHistoryManager()
  const setOpenRequest = browserHook.useSetOpenRequest()
  const {setLoadingProgress, setNavigatables} = tabHook.useTabManager()
  const {onMessage} = useMessageManager(tab.id)

  const onLoadEnd: WebViewSharedProps['onLoadEnd'] = async ({nativeEvent}) => {
    if ((nativeEvent as WebViewError).code) {
      return
    }
    const url = nativeEvent.url as string
    const {title} = nativeEvent
    addHistory(tab.id, title, url)
    setOpenRequest()
  }

  const onNavigationStateChange: WebViewSharedProps['onNavigationStateChange'] = e => {
    if (!e.loading) {
      return
    }
    setNavigatables(tab.id, {
      canGoBack: e.canGoBack as boolean,
      canGoForward: e.canGoForward as boolean,
    })
  }

  const onLoadProgress: WebViewSharedProps['onLoadProgress'] = useCallback(
    ({nativeEvent}) => {
      setLoadingProgress(tab.id, nativeEvent.progress)
    },
    [setLoadingProgress, tab.id],
  )

  if (!tab.url) {
    return <Home style={style} />
  }

  return (
    <View style={style}>
      <NativeWebView
        allowFileAccess
        injectedJavaScript={Injectable['injectable.js']}
        mediaPlaybackRequiresUserAction
        onLoadEnd={onLoadEnd}
        onLoadProgress={onLoadProgress}
        onMessage={onMessage}
        onNavigationStateChange={onNavigationStateChange}
        ref={ref => {
          webViewRefs.set(tab.id, ref as NativeWebView)
        }}
        renderError={error => <Error error={error} />}
        source={{uri: tab.url}}
        sharedCookiesEnabled
      />
    </View>
  )
}
