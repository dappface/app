import React, {useEffect} from 'react'
import {FlatList, ScaledSize} from 'react-native'
import Orientation from 'react-native-orientation'
import {useSelector} from 'react-redux'
import styled from 'styled-components/native'

import {DefaultTemplate} from 'src/components/templates'
import {
  ISafeAreaPosition,
  useBottomAppBarHeight,
  useBrowserManager,
  useDimensions,
  useHasBezel,
  useOrientation,
  useSafeAreaPosition,
} from 'src/hooks'
import {browserSelector} from 'src/redux/module/browser'
import {AddressBar} from './address-bar'
import {BottomAppBar} from './bottom-app-bar'
import {StatusBar} from './status-bar'
import {TabList} from './tab-list'
import {WebView} from './web-view'

export function BrowserScreen() {
  const bottomAppBarHeight = useBottomAppBarHeight()
  const {scrollTo, tabListManager, webViewListRef} = useBrowserManager()
  const hasBezel = useHasBezel()
  const orientation = useOrientation()
  const {window} = useDimensions()
  const safeAreaPosition = useSafeAreaPosition()

  const activeTabIndex = useSelector(browserSelector.getActiveTabIndex)
  const showAddressBar = useSelector(browserSelector.getShowAddressBar)
  const tabs = useSelector(browserSelector.getTabs)

  function getItemLayout(
    _: any,
    index: number,
  ): {length: number; offset: number; index: number} {
    return {
      index,
      length: window.width,
      offset: window.width * index,
    }
  }

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
              bottomAppBarHeight={bottomAppBarHeight}
              hasBezel={hasBezel}
              orientation={orientation}
              safeAreaPosition={safeAreaPosition}
              tab={item}
              window={window}
            />
          )}
        />

        <BottomAppBar />
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
  bottomAppBarHeight: number
  hasBezel: boolean
  orientation: Orientation.orientation
  safeAreaPosition: ISafeAreaPosition
  window: ScaledSize
}

const StyledWebView = styled(WebView)<IStyledWebViewProps>`
  ${({bottomAppBarHeight}) => `
    padding-bottom: ${bottomAppBarHeight};
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
