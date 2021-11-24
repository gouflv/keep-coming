import React, { FC } from 'react'
import Button from './Button'
import Panel from './Panel'

const PostListItem: FC<{ data: any }> = ({ data }) => {
  return (
    <Panel className="relative mb-4 border hover:border-blue-400 cursor-pointer">
      {/* Header */}
      <div className="space-x-1 mb-1 text-xs text-gray-500">
        <a href="" className="p-0.5 -ml-0.5 hover:underline hover:bg-gray-100">
          {data.node.name}
        </a>
        <span>·</span>
        <a href="" className="p-0.5 hover:underline hover:bg-gray-100">
          {data.author.name}
        </a>
        <time className="">{data.create_at}</time>
      </div>

      {/* Body */}
      <div className="mb-4 text-lg">{data.title}</div>
      <div className="mb-4 text-sm text-gray-800">{data.content}</div>

      {/* Footer */}
      <div className="flex items-center -mb-1 text-sm text-gray-500">
        <div className="space-x-4 flex-grow-0">
          <a href="" className="px-1.5 py-1 -ml-1.5 hover:bg-gray-100 rounded">
            5 Likes
          </a>
          <a href="" className="px-1.5 py-1 -ml-1.5 hover:bg-gray-100 rounded">
            6 Comments
          </a>
        </div>
      </div>
    </Panel>
  )
}

export default PostListItem
