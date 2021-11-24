import type { NextPage } from 'next'
import React from 'react'
import Button from '../components/Button'
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
              key={i}
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
          <Panel title={'Top Nodes'} className="mb-4">
            <ol className="divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="py-2 flex items-center">
                  <div className="mr-3 text-sm">{i + 1}</div>
                  <div>
                    <a href="">Lorem ipsum dolor sit.</a>
                  </div>
                </li>
              ))}
            </ol>
            {/* <div className="mt-4">
              <Button className="mt-2" round type={'primary'}>
                Explore
              </Button>
            </div> */}
          </Panel>

          <Panel title={'My Nodes'}>
            <ol className="divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="py-2 flex items-center">
                  <div>Lorem ipsum dolor sit.</div>
                </li>
              ))}
            </ol>
            <Button className="mt-4" round type={'primary'}>
              View All
            </Button>
          </Panel>
        </div>
      </Container>
    </div>
  )
}

export default Home
