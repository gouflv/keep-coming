import { Prisma, PrismaClient } from '@prisma/client'
import * as argon from 'argon2'
import { Random } from 'mockjs'

type Post = Prisma.PostCreateInput
type User = Prisma.UserCreateInput & { posts?: Post[] }
type Node = Prisma.NodeCreateInput & { children?: Prisma.NodeCreateInput[] }

const prisma = new PrismaClient()

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const users: User[] = [
  { name: 'gouflv', email: 'lv.gouf@gmail.com', password: '123' },
  { name: 'fox', email: 'fox@gamil.com', password: 'secret' },
]

const nodes: Node[] = [
  {
    name: '技术',
    parentId: 0,
    sort: 1,
    children: [
      { name: 'Javascript', sort: 1, parentId: 0 },
      { name: 'Android', sort: 2, parentId: 0 },
      { name: 'Linux', sort: 3, parentId: 0 },
    ],
  },
  {
    name: '创意',
    parentId: 0,
    sort: 2,
    children: [
      { name: '分享创造', sort: 1, parentId: 0 },
      { name: '设计', sort: 2, parentId: 0 },
    ],
  },
  { name: '问答', sort: 3, parentId: 0, children: [] },
]

const posts: Post[] = [
  {
    nodeId: 1,
    authorId: 1,
    title: 'Bonjour',
    content: '你好，这是 KC 的第一个帖子',
  },
  ...Array.from({ length: 100 }).map((_, i) => {
    return {
      nodeId: getRandomInt(1, 8),
      authorId: getRandomInt(1, 2),
      title: Random.ctitle(8, 16),
      content: Random.cparagraph(10, 30),
    } as Post
  }),
]

async function run() {
  for (const user of users) {
    user.password = await argon.hash(user.password)
    await prisma.user.create({ data: user })
  }

  for (const node of nodes) {
    const n = await prisma.node.create({
      data: { name: node.name, sort: node.sort, parentId: 0 },
    })

    for (const child of node.children) {
      await prisma.node.create({
        data: { name: child.name, sort: child.sort, parentId: n.id },
      })
    }
  }

  for (const post of posts) {
    await prisma.post.create({ data: post })
  }
}

run()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
