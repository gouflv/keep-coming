import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
})

const authContext = setContext((_, { headers }) => {
  if (typeof localStorage === 'undefined') {
    return headers
  }

  const token = localStorage.getItem('token')
  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  }
})

const client = new ApolloClient({
  link: authContext.concat(link),
  cache: new InMemoryCache(),
})

export default client
