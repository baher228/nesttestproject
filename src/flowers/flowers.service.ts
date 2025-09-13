import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { Flower } from './entities/flowers.entity';
import { FlowerResponseDto } from './dto/response-flower.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FlowersService {
  constructor(private readonly em: EntityManager, private readonly configService: ConfigService) {}
  findAll() {
    console.log(this.configService.get<string>('MODE'))
    const flowers = this.em.findAll(Flower);
    return flowers;
  }
  async create(dto: CreateFlowerDto) {
    const flower = this.em.create(Flower, dto);
    this.em.persistAndFlush(flower);
    return new FlowerResponseDto(flower);
  }
}
