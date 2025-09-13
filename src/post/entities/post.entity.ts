import {
    Entity,
    Property,
    ManyToOne,
  } from '@mikro-orm/postgresql';
  import { BaseEntity } from '../../entities/base.entity';
  import { User } from '../../users/entities/user.entity';
  
  @Entity()
  export class Post extends BaseEntity {
    @Property()
    title!: string;
  
    @Property({ type: 'text' })
    body!: string;
  
    @ManyToOne(() => User)
    author!: User;
  }
  