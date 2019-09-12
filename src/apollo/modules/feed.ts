import gql from 'graphql-tag'

export interface IData {
  feed: {
    edges: IPostEdge[]
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }
}

export interface IPostEdge {
  cursor: string
  node: IPost
}

export interface IPost {
  postType: string
  postData: IRSSEntry | ITweet
}

export interface IRSSEntry {
  author: string
  createdAt: string
  description: string
  guid: string
  imageUrl: string
  publisherUrl: string
  title: string
  url: string
}

export interface ITweet {
  createdAt: string
  idStr: string
  quotedStatus: ITweet | null
  retweetedStatus: ITweet | null
  text: string
  user: IUser
}

export interface IUser {
  name: string
  profileImageUrlHttps: string
  screenName: string
}

export enum QueryType {
  after = 'after',
  before = 'before',
}

export const GET_FEED = gql`
  query($first: Int, $last: Int, $before: String, $after: String) {
    feed(first: $first, last: $last, before: $before, after: $after) {
      edges {
        cursor
        node {
          postType
          postData {
            __typename
            ... on RSSEntry {
              author
              description
              imageUrl
              publisherUrl
              title
              url
              createdAt
            }
            __typename
            ... on Tweet {
              createdAt
              idStr
              quotedStatus {
                idStr
                text
                user {
                  name
                  screenName
                }
              }
              retweetedStatus {
                idStr
                quotedStatus {
                  idStr
                  text
                  user {
                    name
                    screenName
                  }
                }
                text
                user {
                  name
                  screenName
                  profileImageUrlHttps
                }
                createdAt
              }
              text
              user {
                name
                profileImageUrlHttps
                screenName
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`
