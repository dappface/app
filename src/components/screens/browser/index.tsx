import React, {useCallback, useEffect} from 'react'
import {FlatList, ScaledSize} from 'react-native'
import Orientation from 'react-native-orientation'
import {useSelector} from 'react-redux'
import styled from 'styled-components/native'

import {DefaultTemplate} from 'src/components/templates'
import {
  ISafeAreaPosition,
  useBrowserManager,
  useBrowserNavigationHeight,
  useDimensions,
  useHasBezel,
  useOrientation,
  useSafeAreaPosition,
} from 'src/hooks'
import {browserSelector} from 'src/redux/module/browser'
import {AddressBar} from './address-bar'
import {BottomSheet} from './bottom-sheet'
import {StatusBar} from './status-bar'
import {TabList} from './tab-list'
import {WebView} from './web-view'

export function BrowserScreen() {
  const browserNavigationHeight = useBrowserNavigationHeight()
  const {scrollTo, tabListManager, webViewListRef} = useBrowserManager()
  const hasBezel = useHasBezel()
  const orientation = useOrientation()
  const {window} = useDimensions()
  const safeAreaPosition = useSafeAreaPosition()

  const activeTabIndex = useSelector(browserSelector.getActiveTabIndex)
  const showAddressBar = useSelector(browserSelector.getShowAddressBar)
  const tabs = useSelector(browserSelector.getTabs)

  const getItemLayout = useCallback(
    (
      _: any,
      index: number,
    ): {length: number; offset: number; index: number} => {
      return {
        index,
        length: window.width,
        offset: window.width * index,
      }
    },
    [window],
  )

  useEffect(() => {
    if (tabs.length > 0) {
      return
    }
    tabListManager.addTab()
  }, [tabListManager, tabs])

  useEffect(() => {
    if (activeTabIndex < 0) {
      return
    }
    setTimeout(() => {
      scrollTo(activeTabIndex)
    }, 100)
  }, [orientation, activeTabIndex, scrollTo])

  return (
    <DefaultTemplate>
      <Container hasBezel={hasBezel} orientation={orientation}>
        <StatusBar />
        <TabList />

        {showAddressBar ? <AddressBar /> : null}

        <FlatList
          horizontal
          pagingEnabled
          data={tabs}
          decelerationRate='fast'
          keyExtractor={item => item.id}
          onMomentumScrollEnd={tabListManager.onMomentumScrollEnd}
          ref={webViewListRef}
          getItemLayout={getItemLayout}
          renderItem={({item}) => (
            <StyledWebView
              browserNavigationHeight={browserNavigationHeight}
              hasBezel={hasBezel}
              orientation={orientation}
              safeAreaPosition={safeAreaPosition}
              tab={item}
              window={window}
            />
          )}
        />

        <BottomSheet />
      </Container>
    </DefaultTemplate>
  )
}

const PORTRAIT = 'PORTRAIT'

interface IContainerProps {
  hasBezel: boolean
  orientation: Orientation.orientation
}

const Container = styled.View<IContainerProps>`
  flex: 1;

  ${({hasBezel, orientation}) => {
    if (orientation !== PORTRAIT) {
      return
    }
    return !hasBezel ? 'padding-top: 44;' : 'padding-top: 20;'
  }}
`

interface IStyledWebViewProps {
  browserNavigationHeight: number
  hasBezel: boolean
  orientation: Orientation.orientation
  safeAreaPosition: ISafeAreaPosition
  window: ScaledSize
}

const StyledWebView = styled(WebView)<IStyledWebViewProps>`
  ${({browserNavigationHeight}) => `
    padding-bottom: ${browserNavigationHeight};
  `}

  ${({window}) => `
    width: ${window.width};
  `}

  ${({hasBezel, orientation, safeAreaPosition}) => `
    padding-horizontal: ${
      !hasBezel && orientation !== PORTRAIT ? safeAreaPosition.top : 0
    };
  `}
`
