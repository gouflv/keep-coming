import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { FC } from 'react'

const GQL_CURRENT_USER = gql`
  query CurrentUser {
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

  if (loading) return null

  console.log(data)

  return (
    <div className="flex items-center space-x-4 text-gray-600">
      {error && (
        <>
          <Link href="/login">
            <a>Log in</a>
          </Link>
          <Link href="/enter">
            <a className="px-2 py-1 text-white bg-blue-600 rounded">
              Create account
            </a>
          </Link>
        </>
      )}

      {data?.currentUser && (
        <>
          <Link href={`user/${data.currentUser.id}`}>
            <a className="flex items-center">
              <img
                src="//placehold.it/100"
                alt=""
                className="inline w-8 h-8 mr-2 rounded-full"
              />
              {data.currentUser.name}
            </a>
          </Link>
          <Link href="logout">
            <a>Logout</a>
          </Link>
        </>
      )}
    </div>
  )
}

export default HeaderUserMenu
