import { Entity, EntityRepositoryType, Property } from '@mikro-orm/postgresql';
import { BaseEntity } from '../../entities/base.entity';
import { FlowerRepository } from '../repositories/flowers.repository';

@Entity({ repository: () => FlowerRepository })
export class Flower extends BaseEntity {
  [EntityRepositoryType]?: FlowerRepository;
  @Property()
  name!: string;

  @Property()
  color: string;

  @Property()
  price: number;
}
