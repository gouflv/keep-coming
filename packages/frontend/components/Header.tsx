import React, { FC } from 'react'

const Header: FC = () => {
  return (
    <div className="px-6 py-4 mb-6 bg-white shadow">
      <div className="mx-auto flex items-center">
        <div className="flex-grow-0 flex">
          <a href="">
            <div className="font-bold text-xl">KeepComing</div>
          </a>
        </div>

        <div className="flex-grow-0 ml-auto flex space-x-2 text-gray-600">
          <a className="">Sign in</a>
          <a className="">Register</a>
          <a className="">User</a>
          <a className="">Logout</a>
        </div>
      </div>
    </div>
  )
}

export default Header
