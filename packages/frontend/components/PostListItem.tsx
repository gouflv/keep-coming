import React, { FC } from 'react'
import { dateFormat, fromNow } from '../utils/format'
import Panel from './Panel'

const PostListItem: FC<{ data: any }> = ({ data }) => {
  return (
    <Panel className="relative mb-4 border hover:border-blue-400 cursor-pointer">
      {/* Header */}
      <dl className="flex space-x-1 mb-2 text-xs text-gray-500">
        <div className="flex">
          <dd>
            <a
              href=""
              className="p-0.5 -mx-0.5 hover:underline hover:bg-gray-100"
            >
              {data.node.name}
            </a>
          </dd>
        </div>
        <div>
          <span>·</span>
        </div>
        <div className="flex">
          <dt>Posted by</dt>
          <dd>
            <a href="" className="p-0.5 hover:underline hover:bg-gray-100">
              {data.author.name}
            </a>
          </dd>
        </div>
        <div className="flex">
          <dd title={dateFormat(data.create_at)}>{fromNow(data.create_at)}</dd>
        </div>
      </dl>

      {/* Body */}
      <div className="mb-4 text-xl">{data.title}</div>
      <div className="mb-4 text-sm text-gray-800 max-h-25 overflow-hidden">
        {data.content}
      </div>

      {/* Footer */}
      <div className="flex items-center -mb-1 text-sm text-gray-500">
        <div className="space-x-2 flex-grow-0">
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
