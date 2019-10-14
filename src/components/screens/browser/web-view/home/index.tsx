import {useQuery} from '@apollo/react-hooks'
import React, {useState} from 'react'
import {FlatList, ViewStyle} from 'react-native'

import {feed} from 'src/apollo/modules'
import {useBrowserManager} from 'src/hooks'
import {Post} from '../feed/post'
import {Error} from './error'
import {Loading} from './loading'
import {Search} from './search'

interface IProps {
  style?: ViewStyle
}

export function Home({style}: IProps) {
  const {openLink} = useBrowserManager()

  const {data, error, fetchMore, loading} = useQuery(feed.GET_FEED, {
    variables: {
      first: DEFAULT_POST_NUM,
    },
  })

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true)
    // @ts-ignore
    await fetchMore({
      notifyOnNetworkStatusChange: true,
      updateQuery,
      variables: {
        before: data.feed.edges[0].cursor,
        last: DEFAULT_POST_NUM,
      },
    })
    setRefreshing(false)
  }

  const onPressPost = (url: string) => {
    openLink(url, true)
  }

  const [loadingMore, setLoadingMore] = useState(false)

  const onEndReached = async () => {
    if (loadingMore) {
      return
    }
    if (!data.feed.pageInfo.hasNextPage) {
      return
    }

    setLoadingMore(true)
    // @ts-ignore
    await fetchMore({
      notifyOnNetworkStatusChange: true,
      updateQuery,
      variables: {
        after: data.feed.edges[data.feed.edges.length - 1].cursor,
        first: DEFAULT_POST_NUM,
      },
    })
    setLoadingMore(false)
  }

  function renderListFooterComponent() {
    if (loading) {
      return <Loading />
    }

    if (loadingMore) {
      return <Loading isRefetch />
    }

    if (error) {
      return <Error retry={onRefresh} />
    }

    return null
  }

  return (
    <FlatList
      contentContainerStyle={style}
      extraData={onPressPost}
      data={(data && data.feed ? data.feed.edges : []) as feed.IPostEdge[]}
      keyExtractor={item => item.cursor}
      ListFooterComponent={renderListFooterComponent}
      ListHeaderComponent={<Search />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.01}
      onRefresh={onRefresh}
      refreshing={refreshing}
      renderItem={({item}) => (
        <Post
          onPress={onPressPost}
          postData={item.node.postData}
          postType={item.node.postType}
        />
      )}
    />
  )
}

export const DEFAULT_POST_NUM = 10

const updateQuery = (prev: any, {fetchMoreResult}: any) => {
  if (!fetchMoreResult) {
    return prev
  }
  return {
    ...prev,
    feed: {
      __typename: prev.feed.__typename,
      edges: [...prev.feed.edges, ...fetchMoreResult.feed.edges],
      pageInfo: fetchMoreResult.feed.pageInfo,
    },
  }
}
