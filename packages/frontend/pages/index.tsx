import type { NextPage } from 'next'
import React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import Panel from '../components/Panel'
import PostListItem from '../components/PostListItem'

const Home: NextPage = () => {
  return (
    <div>
      <Header></Header>

      <Container className="grid grid-cols-12 gap-8">
        <div className="col-span-9">
          {Array.from({ length: 10 }).map((_, i) => (
            <PostListItem
              data={{
                title:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt hic quos blanditiis',
                content:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt hic quos blanditiis fugit! Ab delectus laboriosam officiis consequuntur, ullam adipisci numquam modi explicabo, sit nesciunt quo. Iusto et recusandae asperiores!',
              }}
            />
          ))}
        </div>
        <div className="col-span-3">
          <Panel title={'Top Nodes'}>AA</Panel>
        </div>
      </Container>
    </div>
  )
}

export default Home
