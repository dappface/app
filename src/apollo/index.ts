import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import introspectionQueryResultData from 'lib/fragment-types.json'
import { API_URL } from 'react-native-dotenv'
import Reactotron from 'reactotron-react-native'

export let client: ApolloClient<any>

export const initClient = () => {
  Reactotron.log(`Connecting Apollo Client to ${API_URL}`)

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })

  const cache = new InMemoryCache({ fragmentMatcher })
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        Reactotron.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) {
      Reactotron.error(`[Network error]: ${networkError}`)
    }
  })

  const httpLink = new HttpLink({
    uri: `${API_URL}/query`
  })

  const link = ApolloLink.from([errorLink, httpLink])
  client = new ApolloClient({
    cache,
    link
  })
}
