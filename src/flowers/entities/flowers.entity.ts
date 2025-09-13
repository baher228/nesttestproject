import { Entity, Property } from '@mikro-orm/postgresql';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
export class Flower extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  color: string;

  @Property()
  price: number;
}
