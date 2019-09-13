import React from 'react'
import {Animated} from 'react-native'
import {IconButton} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {NavigationBarContainer} from 'src/components/screens/browser/bottom-app-bar/navigation-bar-container'
import {useBottomAppBarManager, useBrowserManager} from 'src/hooks'
import {bookmarkHook} from 'src/redux/module/bookmark'
import {browserSelector, browserType} from 'src/redux/module/browser'

interface IProps {
  isOpen: boolean
  onMore: () => void
  position: Animated.Value
}

export function NavigationBar({isOpen, onMore, position}: IProps) {
  const {closeBottomAppBar} = useBottomAppBarManager()
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

  function onPressAdd() {
    closeBottomAppBar()
    addTab()
  }

  function onPressMore() {
    closeBottomAppBar()
    onMore()
  }

  return (
    <NavigationBarContainer isOpen={isOpen} position={position}>
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
      <IconButton disabled={isOpen} icon='add' onPress={onPressAdd} size={24} />
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
    </NavigationBarContainer>
  )
}
