import { gql } from '@apollo/client'

export const GQL_QUERY_LOGIN = gql`
  query Login($password: String!, $name: String!) {
    login(password: $password, name: $name) {
      access_token
    }
  }
`
