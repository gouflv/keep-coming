import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { NodeService } from '../node.service'
import { PostCategoryService } from '../../post-category/post-category.service'
import { Node } from '@kc/shared'

@Resolver(of => Node)
export class NodePostCategoryResolver {
  constructor(
    private nodeService: NodeService,
    private postCategoryService: PostCategoryService
  ) {}

  @ResolveField()
  async postCategories(@Parent() node: Node) {
    return this.postCategoryService.postCategories({
      nodeId: {
        equals: node.id
      }
    })
  }
}
