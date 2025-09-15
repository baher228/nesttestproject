import { Module } from '@nestjs/common';
import { FlowersGraphqlResolver } from './flowers-graphql.resolver';
import { FlowersService } from '../flowers/flowers.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Flower } from '../flowers/entities/flowers.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Flower])],
  providers: [FlowersGraphqlResolver, FlowersService],
})
export class FlowersGraphqlModule {}
