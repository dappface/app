import React from 'react'

import {feed} from 'src/apollo/modules'
import {OnPress} from './common'
import {RSSEntry} from './rss-entry'
import {Tweet} from './tweet'

interface IProps extends feed.IPost {
  onPress: OnPress
}

export function Post({postType, postData, onPress}: IProps) {
  return postType === 'rssEntry' ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RSSEntry {...(postData as feed.IRSSEntry)} onPress={onPress} />
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Tweet {...(postData as feed.ITweet)} onPress={onPress} />
  )
}
