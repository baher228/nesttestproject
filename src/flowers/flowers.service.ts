import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Flower } from './entities/flowers.entity';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { FlowerResponseDto } from './dto/response-flower.dto';
import { FlowerRepository } from './repositories/flowers.repository';

@Injectable()
export class FlowersService {
  constructor(
    private readonly flowersRepository: FlowerRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<Flower[]> {
    return await this.flowersRepository.findAll();
  }

  async create(dto: CreateFlowerDto): Promise<FlowerResponseDto> {
    const flower = this.em.create(Flower, dto);
    await this.em.persistAndFlush(flower);
    return new FlowerResponseDto(flower);
  }
}
