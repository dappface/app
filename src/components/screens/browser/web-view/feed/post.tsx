import * as React from 'react'
import {feed} from 'src/apollo/modules'
import {OnPress} from 'src/components/screens/browser/web-view/feed/common'
import {RSSEntry} from 'src/components/screens/browser/web-view/feed/rss-entry'
import {Tweet} from 'src/components/screens/browser/web-view/feed/tweet'

interface IProps extends feed.IPost {
  onPress: OnPress
}

export const Post = ({postType, postData, onPress}: IProps) =>
  postType === 'rssEntry' ? (
    <RSSEntry {...(postData as feed.IRSSEntry)} onPress={onPress} />
  ) : (
    <Tweet {...(postData as feed.ITweet)} onPress={onPress} />
  )
