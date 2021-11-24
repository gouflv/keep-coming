import React, { FC } from 'react'
import ClientOnly from './ClientOnly'
import HeaderUserMenu from './HeaderUserMenu'

const Header: FC = () => {
  return (
    <div className="px-6 py-4 mb-6 bg-white shadow">
      <div className="mx-auto flex items-center">
        <div className="flex-grow-0 flex">
          <a href="">
            <div className="font-bold text-xl">KeepComing</div>
          </a>
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
