import { gql } from '@apollo/client'

export const GQL_FRAGMENT_POST_FIELDS = gql`
  fragment PostFields on PostPaginatedResponse {
    total
    items {
      id
      title
      content
      create_at
      author {
        id
        name
      }
      node {
        id
        name
      }
    }
  }
`
