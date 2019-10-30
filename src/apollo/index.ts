import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link'
import {onError} from 'apollo-link-error'
import {HttpLink} from 'apollo-link-http'
import introspectionQueryResultData from 'lib/fragment-types.json'
import {DAPPFACE_DOMAIN} from 'react-native-dotenv'
import Reactotron from 'reactotron-react-native'

// eslint-disable-next-line import/no-mutable-exports
export let client: ApolloClient<any>

export const initApolloClient = () => {
  const uri = `https://api.${DAPPFACE_DOMAIN}/query`
  Reactotron.log(`Connecting Apollo Client to ${uri}`)

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  })

  const cache = new InMemoryCache({fragmentMatcher})
  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) =>
        Reactotron.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
    }
    if (networkError) {
      Reactotron.error(`[Network error]: ${networkError}`)
    }
  })

  const httpLink = new HttpLink({
    uri,
  })

  const link = ApolloLink.from([errorLink, httpLink])
  client = new ApolloClient({
    cache,
    link,
  })
}
