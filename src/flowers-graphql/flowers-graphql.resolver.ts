import { Query, Resolver } from '@nestjs/graphql';
import { FlowersService } from 'src/flowers/flowers.service';
import { FlowerModel } from './flower.model';
import { CreateRequestContext, EntityManager } from '@mikro-orm/core';

@Resolver()
export class FlowersGraphqlResolver {
  constructor(
    private readonly flowersService: FlowersService,
    private readonly em: EntityManager,
  ) {}

  @Query(() => [FlowerModel], { name: 'flowers' })
  @CreateRequestContext((self: FlowersGraphqlResolver) => self.em)
  findAll() {
    return this.flowersService.findAll();
  }
}
