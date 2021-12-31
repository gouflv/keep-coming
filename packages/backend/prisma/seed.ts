import { Prisma, PrismaClient } from '@prisma/client'
import { Random } from 'mockjs'

const prisma = new PrismaClient()

async function run() {}

run()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
