import * as React from 'react'
import { FlatList, ScaledSize } from 'react-native'
import Orientation from 'react-native-orientation'
import { useMappedState } from 'redux-react-hook'
import { AddressBar } from 'src/components/screens/browser/address-bar'
import { BottomAppBar } from 'src/components/screens/browser/bottom-app-bar'
import { TabList } from 'src/components/screens/browser/tab-list'
import { WebView } from 'src/components/screens/browser/web-view'
import { DefaultTemplate } from 'src/components/templates'
import { Size } from 'src/const'
import { useBrowserManager, useDimensions, useOrientation } from 'src/hooks'
import { IState } from 'src/redux/module'
import { browserSelector } from 'src/redux/module/browser'
import { deviceHelper } from 'src/utils'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
}

export function Browser({ componentId }: IProps) {
  const { scrollTo, tabListManager, webViewListRef } = useBrowserManager()
  const orientation = useOrientation()
  const { window } = useDimensions()

  const mapState = React.useCallback(
    (state: IState) => ({
      activeTabIndex: browserSelector.getActiveTabIndex(state),
      showAddressBar: browserSelector.getShowAddressBar(state),
      tabs: browserSelector.getTabs(state)
    }),
    []
  )
  const { activeTabIndex, showAddressBar, tabs } = useMappedState(mapState)

  const getItemLayout = (
    _: any,
    index: number
  ): { length: number; offset: number; index: number } => ({
    index,
    length: window.width,
    offset: window.width * index
  })

  React.useEffect(() => {
    if (tabs.length > 0) {
      return
    }
    tabListManager.addTab()
  }, [tabs])

  React.useEffect(() => {
    if (activeTabIndex < 0) {
      return
    }
    setTimeout(() => {
      scrollTo(activeTabIndex)
    }, 100)
  }, [orientation, activeTabIndex])

  return (
    <DefaultTemplate>
      <Container orientation={orientation}>
        <TabList />

        {showAddressBar ? <AddressBar /> : null}

        <FlatList
          horizontal={true}
          pagingEnabled={true}
          data={tabs}
          decelerationRate='fast'
          keyExtractor={item => item.id}
          onMomentumScrollEnd={tabListManager.onMomentumScrollEnd}
          ref={webViewListRef}
          getItemLayout={getItemLayout}
          renderItem={({ item }) => (
            <StyledWebView
              orientation={orientation}
              window={window}
              tab={item}
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
  orientation: Orientation.orientation
}

const Container = styled.View<IContainerProps>`
  flex: 1;

  ${({ orientation }) => {
    if (orientation !== PORTRAIT) {
      return
    }
    return deviceHelper.hasBezel() ? 'padding-top: 44;' : 'padding-top: 20;'
  }}
`

interface IStyledWebViewProps {
  orientation: Orientation.orientation
  window: ScaledSize
}

const StyledWebView = styled(WebView)<IStyledWebViewProps>`
  padding-bottom: ${Size.BOTTOM_APP_BAR.HEIGHT};

  ${({ window }) => `
    width: ${window.width};
  `}

  ${({ orientation }) => `
    padding-horizontal: ${
      deviceHelper.hasBezel() && orientation !== PORTRAIT ? Size.SCREEN.TOP : 0
    };
  `}
`
