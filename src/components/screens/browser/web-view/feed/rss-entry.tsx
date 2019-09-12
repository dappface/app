import moment from 'moment'
import * as React from 'react'
import {
  Caption,
  Card,
  Headline,
  Paragraph,
  Subheading,
  Text,
} from 'react-native-paper'
import {feed} from 'src/apollo/modules'
import {Expanded, Padding} from 'src/components/atoms'
import {OnPress} from 'src/components/screens/browser/web-view/feed/common'
import {Size} from 'src/const'
import styled from 'styled-components/native'

interface IRSSEntryProps extends feed.IRSSEntry {
  onPress: OnPress
}

export const RSSEntry = ({
  author,
  createdAt,
  description,
  imageUrl,
  onPress,
  publisherUrl,
  title,
  url,
}: IRSSEntryProps) => (
  <Padding horizontalSize={Size.MARGIN_8} verticalSize={Size.MARGIN_2}>
    <Card onPress={() => onPress(url)}>
      <Card.Content>
        <Header>
          {/* <ProfileImage source={{ uri: user.profileImageUrlHttps }} /> */}
          <Subheading>{publisherUrl.replace('https://', '')}</Subheading>
        </Header>

        <ImageContainer>
          <Expanded.Image source={{uri: imageUrl}} resizeMode='cover' />
        </ImageContainer>

        <Main>
          <Headline>{title}</Headline>
          <Paragraph ellipsizeMode='tail' numberOfLines={3}>
            {description}
          </Paragraph>
        </Main>

        <Footer>
          <Text>{author}</Text>
          <Caption> • {moment(createdAt).fromNow()}</Caption>
        </Footer>
      </Card.Content>
    </Card>
  </Padding>
)

const Header = styled.TouchableWithoutFeedback`
  flex-direction: row;
  align-items: center;
  height: 40;
`

// const ProfileImage = styled.Image`
//   width: ${PROFILE_IMAGE_SIZE};
//   height: ${PROFILE_IMAGE_SIZE};
//   border-radius: ${PROFILE_IMAGE_SIZE / 2};
//   margin-right: ${Size.MARGIN_8};
// `

const ImageContainer = styled.View`
  border-radius: ${Size.BORDER_RADIUS};
  overflow: hidden;
  height: 200;
`

const Main = styled.View`
  margin-top: ${Size.MARGIN_8};
`

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${Size.MARGIN_8};
`
