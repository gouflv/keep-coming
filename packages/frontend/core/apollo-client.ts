import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    if (typeof window === 'undefined') {
      return headers
    }

    const token = localStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
})

export default client
