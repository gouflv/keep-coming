import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'

export enum PostSort {
  CREATE = 'create_at',
  REPLY = 'last_reply_at',
}

registerEnumType(PostSort, {
  name: 'PostSort',
  valuesMap: {
    CREATE: {
      description: 'Sort by `create_at`',
    },
    REPLY: {
      description: 'Sort by `last_reply_at`',
    },
  },
})

@ArgsType()
export class PostsArgs {
  @Field(type => PostSort)
  sort: PostSort = PostSort.REPLY
}
