import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Flower } from '../entities/flowers.entity';

@Injectable()
export class FlowerRepository extends EntityRepository<Flower> {}
