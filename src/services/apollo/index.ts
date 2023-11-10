import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

import { getRefreshedAccessToken } from '../authService'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
})

const authLink = setContext(async (_, { headers, ...rest }) => {
  try {
    const token = await getRefreshedAccessToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  } catch (e) {
    console.log(e)
  }
})

const link = authLink.concat(httpLink)
const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link,
  cache
})

export const apolloClientAddition = new ApolloClient({
  link: httpLink,
  cache
})
