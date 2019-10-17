import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {StyleSheet} from 'react-native'
import {IconButton} from 'react-native-paper'
import Animated from 'react-native-reanimated'

import {
  useBottomSheetContext,
  useBottomSheetInitialTop,
  useBrowserManager,
  useBrowserNavigationHeight,
  useDimensions,
} from 'src/hooks'
import {bookmarkHook} from 'src/redux/module/bookmark'
import {browserSelector, browserType} from 'src/redux/module/browser'
import {uiHook, uiType} from 'src/redux/module/ui'

const {interpolate} = Animated

export function BrowserNavigation() {
  const {screen} = useDimensions()
  const initialPositionY = useBottomSheetInitialTop()
  const height = useBrowserNavigationHeight()
  const {isOpen, translateY} = useBottomSheetContext()
  const {
    goBack,
    goForward,
    tabListManager: {addTab},
  } = useBrowserManager()

  const bookmarkStatus = useSelector(
    browserSelector.getBookmarkStatusFactory(isOpen),
  )
  const canGoBack = useSelector(browserSelector.getCanGoBack)
  const canGoForward = useSelector(browserSelector.getCanGoForward)
  const {toggleBookmark} = bookmarkHook.useBookmarkManager()
  const setBottomDrawer = uiHook.useSetBottomDrawer()

  const opacity = interpolate(translateY, {
    inputRange: [screen.height / 2, initialPositionY],
    outputRange: [0, 1],
  })

  const onPressMore = useCallback(() => {
    setBottomDrawer({
      type: uiType.BottomDrawerType.BrowserOptions,
    })
  }, [setBottomDrawer])

  return (
    <Animated.View style={[styles.navigationBar, {height, opacity}]}>
      <IconButton
        disabled={isOpen || !canGoBack}
        icon='arrow-back'
        onPress={goBack}
        size={24}
      />
      <IconButton
        disabled={isOpen || !canGoForward}
        icon='arrow-forward'
        onPress={goForward}
        size={24}
      />
      <IconButton disabled={isOpen} icon='add' onPress={addTab} size={24} />
      <IconButton
        disabled={bookmarkStatus === browserType.BookmarkStatus.Disabled}
        icon={
          bookmarkStatus === browserType.BookmarkStatus.Bookmarked
            ? 'star'
            : 'star-border'
        }
        onPress={toggleBookmark}
        size={24}
      />
      <IconButton
        disabled={isOpen}
        icon='more-vert'
        onPress={onPressMore}
        size={24}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  navigationBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
