import { Field, InputType } from '@nestjs/graphql'
import { Post } from '@kc/shared'

@InputType()
export class CreatePostInput implements Partial<Post> {
  @Field()
  title: string

  @Field()
  content: string

  @Field()
  nodeId: string

  @Field()
  categoryId: string
}
