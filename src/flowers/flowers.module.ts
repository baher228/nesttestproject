import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Flower } from './entities/flowers.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Flower])],
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule {}
