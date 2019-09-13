import React, {useEffect, useMemo, useState} from 'react'
import {
  ActivityIndicator,
  IconButton,
  Surface,
  Text,
  TouchableRipple,
} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useSelector} from 'react-redux'
import {Padding} from 'src/components/atoms'
import {Color, Size} from 'src/const'
import {useBrowserManager} from 'src/hooks'
import {browserSelector} from 'src/redux/module/browser'
import {tabType} from 'src/redux/module/tab'
import {imageUtil} from 'src/utils'
import styled from 'styled-components/native'

export interface IProps {
  tab: tabType.ITab
}

export function TabItem({tab}: IProps) {
  const {tabListManager} = useBrowserManager()
  const hostname = useMemo(() => {
    if (!tab.url) {
      return
    }
    return tab.url.split('/')[2]
  }, [tab.url])
  const title = useMemo(() => {
    if (!tab.title) {
      return hostname
    }
    return /^http(s)?:\/\//.test(tab.title) ? hostname : tab.title
  }, [hostname, tab.title])
  const [favicon, setFavicon] = useState<string | undefined>(undefined)

  const activeTabId = useSelector(browserSelector.getActiveTabId)
  const isSelected = useMemo(() => tab.id === activeTabId, [
    tab.id,
    activeTabId,
  ])

  useEffect(() => {
    ;(async () => {
      if (!tab.url) {
        return
      }

      const url = `${tab.url
        .split('/')
        .slice(0, 3)
        .join('/')}/favicon.ico`

      try {
        const imageSource = await imageUtil.fetchImageSource(url)
        setFavicon(imageSource)
      } catch (e) {
        const icon = await Ionicons.getImageSource(
          'md-document',
          20,
          Color.TEXT.BLACK_MEDIUM_EMPHASIS,
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
                  <Favicon resizeMode='contain' source={{uri: favicon}} />
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
            <CloseButton
              icon='close'
              onPress={tabListManager.removeFactory(tab.id)}
              size={16}
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
  width: ${({isSelected}) => (isSelected ? 140 : 100)};
  elevation: ${({isSelected}) => (isSelected ? 4 : 1)};
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
  ${({isSelected}) =>
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

const CloseButton = styled(IconButton)`
  margin: 0;
`
