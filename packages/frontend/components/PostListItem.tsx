import { FC } from 'react'
import Panel from './Panel'

const PostListItem: FC<{ data: any }> = ({ data }) => {
  return (
    <Panel className="relative mb-4 border hover:border-blue-300 cursor-pointer">
      {/* Header */}
      <div className="space-x-1 mb-1 text-xs text-gray-500">
        <a href="" className="p-0.5 -ml-0.5 hover:underline hover:bg-gray-100">
          发现分享
        </a>
        <span>·</span>
        <a href="" className="p-0.5 hover:underline hover:bg-gray-100">
          gouflv
        </a>
        <time className="">6 hours ago</time>
      </div>

      {/* Body */}
      <div className="mb-2">{data.title}</div>
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
        <div className="flex-grow-0 ml-auto">
          <a
            href=""
            className="px-1.5 py-1 -mr-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Save
          </a>
        </div>
      </div>
    </Panel>
  )
}

export default PostListItem
