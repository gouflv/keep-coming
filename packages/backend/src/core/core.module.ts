import { Global, Module, NotFoundException } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
  ],
  providers: [
    ConfigService,
    {
      provide: PrismaService,
      useFactory: () =>
        new PrismaService({
          rejectOnNotFound: {
            findUnique: () => new NotFoundException(),
            findFirst: () => new NotFoundException(),
          },
        }),
    },
  ],
  exports: [ConfigService, PrismaService],
})
export class CoreModule {}
