import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './core/prisma.service'
import { WinstonModule } from 'nest-winston'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({})
  })

  app.useGlobalPipes(new ValidationPipe())

  const prismaService: PrismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  await app.listen(port)

  console.log(`Nest running on ${await app.getUrl()}`)
}
bootstrap()
