import moment from 'moment'
import * as React from 'react'
import {
  Caption,
  Card,
  List,
  Paragraph,
  Text,
  TouchableRipple
} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { feed } from 'src/apollo/modules'
import { Padding } from 'src/components/atoms'
import { OnPress } from 'src/components/screens/browser/web-view/feed/common'
import { Color, Size } from 'src/const'
import styled from 'styled-components/native'

interface ITweetProps extends feed.ITweet {
  onPress: OnPress
}

export const Tweet = ({
  createdAt,
  idStr,
  quotedStatus,
  retweetedStatus: rs,
  text,
  onPress,
  user
}: ITweetProps) => {
  const profileImageSource = {
    uri: rs === null ? user.profileImageUrlHttps : rs.user.profileImageUrlHttps
  }
  const profileName = rs === null ? user.name : rs.user.name
  const profileScreenName = rs === null ? user.screenName : rs.user.screenName
  const mainText = rs === null ? text : rs.text

  const onPressCard = () => {
    const url =
      rs === null
        ? `https://twitter.com/${user.screenName}/status/${idStr}`
        : `https://twitter.com/${rs.user.screenName}/status/${rs.idStr}`
    onPress(url)
  }

  const onPressUser = () => {
    const url =
      rs === null
        ? `https://twitter.com/${user.screenName}`
        : `https://twitter.com/${rs.user.screenName}`
    onPress(url)
  }

  const onPressAnnotation = () => {
    onPress(`https://twitter.com/${user.screenName}`)
  }

  return (
    <Padding horizontalSize={Size.MARGIN_8} verticalSize={Size.MARGIN_2}>
      <Card onPress={onPressCard}>
        <Card.Content>
          {rs !== null ? (
            <Annotation onPress={onPressAnnotation}>
              <>
                <StyledIonicons name='md-repeat' />
                <Caption>{user.name} Retweeted</Caption>
              </>
            </Annotation>
          ) : (
            undefined
          )}

          <StyledListItem
            left={() => <ProfileImage source={profileImageSource} />}
            title={profileName}
            description={profileScreenName}
            onPress={onPressUser}
          />

          <Main>
            <Paragraph>{mainText}</Paragraph>
          </Main>

          {rs === null ? (
            quotedStatus ? (
              <QuotedTweet onPress={onPress} quotedStatus={quotedStatus} />
            ) : null
          ) : rs.quotedStatus ? (
            <QuotedTweet onPress={onPress} quotedStatus={rs.quotedStatus} />
          ) : null}

          <Footer>
            <Text>Twitter</Text>
            <Caption> • {moment(createdAt).fromNow()}</Caption>
          </Footer>
        </Card.Content>
      </Card>
    </Padding>
  )
}

interface IQuotedTweetProps {
  onPress: OnPress
  quotedStatus: feed.ITweet
}

const QuotedTweet = ({ onPress, quotedStatus: qs }: IQuotedTweetProps) => (
  <QuotedTweetContainer
    onPress={() =>
      onPress(`https://twitter.com/${qs.user.screenName}/status/${qs.idStr}`)
    }
  >
    <>
      <QuotedTweetNames>
        <QuotedTweetUserName>{qs.user.name}</QuotedTweetUserName>
        <Caption>@{qs.user.screenName}</Caption>
      </QuotedTweetNames>
      <Paragraph>{qs.text}</Paragraph>
    </>
  </QuotedTweetContainer>
)

const Annotation = styled(TouchableRipple)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Size.MARGIN_8};
  border-radius: ${Size.BORDER_RADIUS};
`

const StyledIonicons = styled(Ionicons)`
  margin-right: ${Size.MARGIN_8};
`

const ProfileImage = styled.Image`
  width: ${Size.LIST_ITEM_HEIGHT};
  height: ${Size.LIST_ITEM_HEIGHT};
  border-radius: ${Size.LIST_ITEM_HEIGHT / 2};
`

const StyledListItem = styled(List.Item)`
  padding: 0px;
  border-radius: ${Size.BORDER_RADIUS};
`

const Main = styled.View`
  margin-top: ${Size.MARGIN_8};
`

const QuotedTweetContainer = styled(TouchableRipple)`
  border-width: 1;
  border-color: ${Color.LIGHT_GRAY};
  border-radius: ${Size.BORDER_RADIUS};
  padding: ${Size.MARGIN_16}px;
  margin-top: ${Size.MARGIN_16};
`

const QuotedTweetNames = styled.View`
  flex-direction: row;
  align-items: center;
`

const QuotedTweetUserName = styled(Text)`
  margin-right: ${Size.MARGIN_8};
`

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${Size.MARGIN_8};
`
