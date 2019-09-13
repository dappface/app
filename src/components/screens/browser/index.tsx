import React, {useCallback, useEffect} from 'react'
import {FlatList, ScaledSize} from 'react-native'
import Orientation from 'react-native-orientation'
import {useMappedState} from 'redux-react-hook'
import {AddressBar} from 'src/components/screens/browser/address-bar'
import {BottomAppBar} from 'src/components/screens/browser/bottom-app-bar'
import {TabList} from 'src/components/screens/browser/tab-list'
import {WebView} from 'src/components/screens/browser/web-view'
import {DefaultTemplate} from 'src/components/templates'
import {Size} from 'src/const'
import {
  ISafeAreaPosition,
  useBrowserManager,
  useDimensions,
  useHasBezel,
  useOrientation,
  useSafeAreaPosition,
} from 'src/hooks'
import {IState} from 'src/redux/module'
import {browserSelector} from 'src/redux/module/browser'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
}

export function Browser({componentId}: IProps) {
  const {scrollTo, tabListManager, webViewListRef} = useBrowserManager()
  const hasBezel = useHasBezel()
  const orientation = useOrientation()
  const {window} = useDimensions()
  const safeAreaPosition = useSafeAreaPosition()

  const mapState = useCallback(
    (state: IState) => ({
      activeTabIndex: browserSelector.getActiveTabIndex(state),
      showAddressBar: browserSelector.getShowAddressBar(state),
      tabs: browserSelector.getTabs(state),
    }),
    [],
  )
  const {activeTabIndex, showAddressBar, tabs} = useMappedState(mapState)

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
              hasBezel={hasBezel}
              orientation={orientation}
              saveAreaPosition={safeAreaPosition}
              tab={item}
              window={window}
            />
          )}
        />

        <BottomAppBar componentId={componentId} />
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
    return hasBezel ? 'padding-top: 44;' : 'padding-top: 20;'
  }}
`

interface IStyledWebViewProps {
  hasBezel: boolean
  orientation: Orientation.orientation
  safeAreaPosition: ISafeAreaPosition
  window: ScaledSize
}

const StyledWebView = styled(WebView)<IStyledWebViewProps>`
  padding-bottom: ${Size.BOTTOM_APP_BAR.HEIGHT};

  ${({window}) => `
    width: ${window.width};
  `}

  ${({hasBezel, orientation, safeAreaPosition}) => `
    padding-horizontal: ${
      hasBezel && orientation !== PORTRAIT ? safeAreaPosition.top : 0
    };
  `}
`
