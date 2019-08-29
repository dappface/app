import * as React from 'react'
import { Animated } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useMappedState } from 'redux-react-hook'
import { NavigationBarContainer } from 'src/components/screens/browser/bottom-app-bar/navigation-bar-container'
import { useBottomAppBarManager, useBrowserManager } from 'src/hooks'
import { IState } from 'src/redux/module'
import { bookmarkHook } from 'src/redux/module/bookmark'
import { browserSelector, browserType } from 'src/redux/module/browser'

interface IProps {
  isOpen: boolean
  onMore: () => void
  position: Animated.Value
}

export const NavigationBar = ({ isOpen, onMore, position }: IProps) => {
  const { closeBottomAppBar } = useBottomAppBarManager()
  const {
    goBack,
    goForward,
    tabListManager: { addTab }
  } = useBrowserManager()
  const mapState = React.useCallback(
    (state: IState) => ({
      bookmarkStatus: browserSelector.getBookmarkStatusFactory(isOpen)(state),
      canGoBack: browserSelector.getCanGoBack(state),
      canGoForward: browserSelector.getCanGoForward(state)
    }),
    []
  )
  const { bookmarkStatus, canGoBack, canGoForward } = useMappedState(mapState)
  const { toggleBookmark } = bookmarkHook.useBookmarkManager()

  const onPressAdd = () => {
    closeBottomAppBar()
    addTab()
  }

  const onPressMore = () => {
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
