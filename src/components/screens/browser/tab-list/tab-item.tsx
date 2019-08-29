import * as React from 'react'
import {
  ActivityIndicator,
  IconButton,
  Surface,
  Text,
  TouchableRipple
} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useMappedState } from 'redux-react-hook'
import { Padding } from 'src/components/atoms'
import { Color, Size } from 'src/const'
import { useBrowserManager } from 'src/hooks'
import { IState } from 'src/redux/module'
import { browserSelector } from 'src/redux/module/browser'
import { tabType } from 'src/redux/module/tab'
import { imageUtil } from 'src/utils'
import styled from 'styled-components/native'

export interface IProps {
  tab: tabType.ITab
}

export const TabItem = ({ tab }: IProps) => {
  const { tabListManager } = useBrowserManager()
  const hostname = React.useMemo(() => {
    if (!tab.url) {
      return
    }
    return tab.url.split('/')[2]
  }, [tab.url])
  const title = React.useMemo(() => {
    if (!tab.title) {
      return hostname
    }
    return /^http(s)?:\/\//.test(tab.title) ? hostname : tab.title
  }, [hostname, tab.title])
  const [favicon, setFavicon] = React.useState<string | undefined>(undefined)

  const mapState = React.useCallback(
    (state: IState) => ({
      activeTabId: browserSelector.getActiveTabId(state)
    }),
    []
  )
  const { activeTabId } = useMappedState(mapState)
  const isSelected = React.useMemo(() => tab.id === activeTabId, [
    tab.id,
    activeTabId
  ])

  React.useEffect(() => {
    ;(async () => {
      if (!tab.url) {
        return
      }

      const url =
        tab.url
          .split('/')
          .slice(0, 3)
          .join('/') + '/favicon.ico'

      try {
        const imageSource = await imageUtil.fetchImageSource(url)
        setFavicon(imageSource)
      } catch (e) {
        const icon = await Ionicons.getImageSource(
          'md-document',
          20,
          Color.TEXT.BLACK_MEDIUM_EMPHASIS
        )
        setFavicon(icon.uri)
      }
    })()
  }, [tab.url])

  return (
    <StyledSurface isSelected={isSelected}>
      <StyledTouchableRipple onPress={tabListManager.selectFactory(tab.id)}>
        <Container isSelected={isSelected}>
          {tab.url ? (
            <>
              <IconContainer>
                {tab.isLoading ? (
                  <Padding size={1}>
                    <ActivityIndicator size={18} />
                  </Padding>
                ) : (
                  <Favicon resizeMode='contain' source={{ uri: favicon }} />
                )}
              </IconContainer>
              <Title numberOfLines={1}>{title}</Title>
            </>
          ) : (
            <>
              <IconContainer>
                <Ionicons
                  name='md-home'
                  size={20}
                  color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
                />
              </IconContainer>

              <Title numberOfLines={1}>Home</Title>
            </>
          )}
          {tab.id === activeTabId && (
            <IconButton
              icon='close'
              onPress={tabListManager.removeFactory(tab.id)}
              size={16}
              style={{ margin: 0 }}
            />
          )}
        </Container>
      </StyledTouchableRipple>
    </StyledSurface>
  )
}
const CONTAINER_BORDER_RADIUS = 16
const FAVICON_WIDTH = 20

interface IContainerProps {
  isSelected: boolean
}

const StyledSurface = styled(Surface)<IContainerProps>`
  width: ${({ isSelected }) => (isSelected ? 140 : 100)};
  elevation: ${({ isSelected }) => (isSelected ? 4 : 1)};
  border-radius: ${CONTAINER_BORDER_RADIUS};
  margin-horizontal: ${Size.MARGIN_4};
`

const StyledTouchableRipple = styled(TouchableRipple)`
  border-radius: ${CONTAINER_BORDER_RADIUS};
`

interface IContainerProps {
  isSelected: boolean
}

const CONTAINER_HEIGHT = 32

const Container = styled.View<IContainerProps>`
  padding-left: ${Size.MARGIN_12};
  height: ${CONTAINER_HEIGHT};
  flex-direction: row;
  align-items: center;
  ${({ isSelected }) =>
    !isSelected &&
    `
    padding-right: ${Size.MARGIN_8};
  `}
`

const Favicon = styled.Image`
  width: ${FAVICON_WIDTH};
  height: ${FAVICON_WIDTH};
  align-self: center;
  border-radius: ${FAVICON_WIDTH / 2};
`

const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: ${Size.MARGIN_8};
`

const Title = styled(Text)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
