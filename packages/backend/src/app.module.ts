import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
import { NodeModule } from './node/node.module'
import { PostModule } from './post/post.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoreModule, UserModule, PostModule, NodeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
