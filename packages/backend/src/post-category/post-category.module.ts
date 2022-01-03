import { Module } from '@nestjs/common'
import { PostCategoryService } from './post-category.service'

@Module({
  providers: [PostCategoryService],
  exports: [PostCategoryService]
})
export class PostCategoryModule {}
