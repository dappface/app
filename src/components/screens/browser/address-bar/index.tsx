import React, {useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {TextInputProps} from 'react-native'
import {
  Caption,
  Card,
  Colors,
  IconButton,
  ProgressBar,
} from 'react-native-paper'
import {CenteredColumn, Padding} from 'src/components/atoms'
import {Editor} from 'src/components/screens/browser/address-bar/editor'
import {Color, Size} from 'src/const'
import {useBrowserManager} from 'src/hooks'
import {browserSelector} from 'src/redux/module/browser'
import styled from 'styled-components/native'

export function AddressBar() {
  const isLoading = useSelector(browserSelector.getIsLoading)
  const loadingProgress = useSelector(browserSelector.getLoadingProgress)
  const url = useSelector(browserSelector.getUrl)

  const {onSearch, onStopLoading, onReload} = useBrowserManager()
  const hostname = useMemo(() => {
    if (url === 'localhost') {
      return url
    }
    if (!url) {
      return null
    }
    return url.split('/')[2]
  }, [url])
  const [isEditing, setIsEditing] = useState(false)

  const onSubmitEditing: TextInputProps['onSubmitEditing'] = ({
    nativeEvent,
  }) => {
    onSearch(nativeEvent.text)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Editor
        onBlur={() => setIsEditing(false)}
        onSubmitEditing={onSubmitEditing}
        url={url}
      />
    )
  }

  return (
    <Padding size={Size.MARGIN_4}>
      <StyledCard onPress={() => setIsEditing(true)}>
        <Container>
          <Padding
            horizontalSize={Size.MARGIN_4}
            verticalSize={
              loadingProgress < 1 ? Size.MARGIN_4 - 1 : Size.MARGIN_4
            }>
            <CenteredColumn>
              <Caption>{hostname}</Caption>
            </CenteredColumn>
          </Padding>

          <IconContainer>
            {isLoading ? (
              <IconButton
                color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
                icon='close'
                onPress={onStopLoading}
                size={24}
              />
            ) : (
              <IconButton
                color={Color.TEXT.BLACK_MEDIUM_EMPHASIS}
                icon='refresh'
                onPress={onReload}
                size={24}
              />
            )}
          </IconContainer>

          {loadingProgress < 1 && (
            <StyledProgressBar progress={loadingProgress} />
          )}
        </Container>
      </StyledCard>
    </Padding>
  )
}

const StyledCard = styled(Card)`
  background: ${Colors.grey100};
`

const Container = styled.View`
  overflow: hidden;
  border-radius: ${Size.BORDER_RADIUS};
`

const IconContainer = styled.View`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`

const StyledProgressBar = styled(ProgressBar)`
  padding-vertical: 0;
`
