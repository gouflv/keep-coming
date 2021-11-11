import { Prisma, PrismaClient } from '@prisma/client'

type Post = Prisma.PostCreateInput
type User = Prisma.UserCreateInput & { posts?: Post[] }
type Node = Prisma.NodeCreateInput & { children?: Prisma.NodeCreateInput[] }

const prisma = new PrismaClient()

const users: User[] = [
  { name: 'gouflv', email: 'lv.gouf@gmail.com' },
  { name: 'fox', email: 'fox@gamil.com' },
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
  {
    nodeId: 6,
    authorId: 1,
    title: '双十一好像越来越没感觉了？你双十一买了啥',
    content:
      '双十一好像越来越没感觉了？你双十一买了啥双十一好像越来越没感觉了？你双十一买了啥',
  },
  {
    nodeId: 1,
    authorId: 1,
    title: '内网环境如何做前端的地图开发？',
    content: '内网环境如何做前端的地图开发？内网环境如何做前端的地图开发？',
  },
  {
    nodeId: 1,
    authorId: 2,
    title: '「白米饭」会让你昏昏欲睡吗？你可以利用这点解决注意力和失眠问题',
    content:
      '「白米饭」会让你昏昏欲睡吗？你可以利用这点解决注意力和失眠问题「白米饭」会让你昏昏欲睡吗？你可以利用这点解决注意力和失眠问题',
  },
]

async function run() {
  for (const user of users) {
    const u = await prisma.user.create({ data: user })
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
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
