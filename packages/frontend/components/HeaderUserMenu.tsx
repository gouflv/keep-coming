import { gql, useQuery } from '@apollo/client'
import { FC } from 'react'

const GQL_CURRENT_USER = gql`
  query CurrentLogin {
    currentUser {
      id
      name
    }
  }
`

const HeaderUserMenu: FC = () => {
  const { loading, error, data } = useQuery(GQL_CURRENT_USER, {
    fetchPolicy: 'network-only',
  })

  if (loading || error) return null

  console.log(data)

  return (
    <div className="flex space-x-2 text-gray-600">
      <a className="">Sign in</a>
      <a className="">Register</a>
      <a className="">User</a>
      <a className="">Logout</a>
    </div>
  )
}

export default HeaderUserMenu
