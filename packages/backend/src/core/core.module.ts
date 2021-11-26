import { Global, Module, NotFoundException } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { join } from 'path'
import { ENV } from 'src/config'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    GraphQLModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: join(
          process.cwd(),
          config.get<string>('GRAPHQL_SCHEMA_FILE') || 'graphql/schema.gql',
        ),
        playground: false,
        plugins: [
          ENV === 'development' && ApolloServerPluginLandingPageLocalDefault(),
        ].filter(plugin => plugin),
        formatError: error => {
          console.error(error)
          return error
        },
      }),
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
