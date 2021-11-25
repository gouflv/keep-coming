import Link from 'next/link'
import React, { FC } from 'react'
import ClientOnly from './ClientOnly'
import HeaderUserMenu from './HeaderUserMenu'

const Header: FC = () => {
  return (
    <div className="px-6 py-2 mb-6 bg-white shadow">
      <div className="mx-auto flex items-center">
        <div className="flex-grow-0 flex">
          <Link href="/">
            <a>
              <div className="font-bold text-xl">KeepComing</div>
            </a>
          </Link>
        </div>

        <div className="flex-grow-0 ml-auto">
          <ClientOnly>
            <HeaderUserMenu />
          </ClientOnly>
        </div>
      </div>
    </div>
  )
}

export default Header
