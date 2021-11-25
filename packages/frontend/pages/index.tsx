import { gql } from '@apollo/client'
import type { NextPage } from 'next'
import React from 'react'
import {
  AppLayout,
  BaseLayout,
  Button,
  Panel,
  PostListItem,
} from '../components'
import { BaseLayoutMain, BaseLayoutSide } from '../components/BaseLayout'
import client from '../core/apollo-client'

const Home: NextPage<{ initialPosts: any[]; nodes: any[] }> = ({
  initialPosts,
  nodes,
}) => {
  return (
    <AppLayout>
      <BaseLayout>
        <BaseLayoutMain>
          {initialPosts.map(post => (
            <PostListItem key={post.id} data={post} />
          ))}
        </BaseLayoutMain>
        <BaseLayoutSide>
          <Panel title={'Top Nodes'} className="mb-4">
            <ol className="divide-y">
              {nodes.map((node, i) => (
                <li key={node.id} className="py-2 flex items-center">
                  <div className="mr-3 text-sm">{i + 1}</div>
                  <div>
                    <a href="">{node.name}</a>
                  </div>
                </li>
              ))}
            </ol>

            <Button className="mt-2" block round type={'primary'}>
              View All
            </Button>
          </Panel>

          <Panel title={'My Nodes'}>
            <ol className="divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="py-2 flex items-center">
                  <div>Lorem ipsum dolor sit.</div>
                </li>
              ))}
            </ol>
          </Panel>
        </BaseLayoutSide>
      </BaseLayout>
    </AppLayout>
  )
}

export default Home

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query HomeData {
        posts {
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
              name
              id
            }
          }
        }
        nodes {
          id
          name
        }
      }
    `,
    variables: {
      order: {
        field: 'CREATE_AT',
        direction: 'ASC',
      },
    },
  })

  return {
    props: {
      initialPosts: data.posts.items,
      nodes: data.nodes,
    },
  }
}
