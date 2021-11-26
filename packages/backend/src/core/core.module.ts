import { Global, Module, NotFoundException } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { PrismaService } from './prisma.service'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: error => {
        console.error(error)
        return error
      },
    }),
  ],
  providers: [
    ConfigService,
    {
      provide: PrismaService,
      useFactory: () =>
        new PrismaService({
          log: ['query', 'info', 'warn', 'error'],
          rejectOnNotFound: () => new NotFoundException(),
        }),
    },
  ],
  exports: [ConfigService, PrismaService],
})
export class CoreModule {}
