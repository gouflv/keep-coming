import { Global, Logger, Module, NotFoundException } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { isDev } from '../config'
import { PrismaService } from './prisma.service'
import * as Joi from 'joi'
import { join } from 'path'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env', '.env.prod'],
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.number(),
        DATABASE_URL: Joi.string(),
        JWT_SECRET: Joi.string(),
        JWT_EXPIRES: Joi.string()
      })
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), './graphql/generated/schema.gql'),
      // playground: true,
      playground: false,
      plugins: isDev ? [ApolloServerPluginLandingPageLocalDefault()] : [],
      formatError: error => {
        console.error(error)
        return error
      }
    })
  ],
  providers: [
    ConfigService,
    Logger,
    {
      provide: PrismaService,
      useFactory: () =>
        new PrismaService({
          log: ['query', 'info', 'warn', 'error'],
          rejectOnNotFound: () => new NotFoundException()
        })
    }
  ],
  exports: [ConfigService, PrismaService]
})
export class CoreModule {}
