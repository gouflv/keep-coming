import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'
import { Post } from './post.model'

@InputType()
export class AddPostInput implements Partial<Post> {
  @Field()
  @MinLength(5)
  @MaxLength(25)
  title: string

  @Field()
  @MinLength(10)
  content: string

  @Field()
  nodeId: number
}
