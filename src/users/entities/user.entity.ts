import { Entity, Property, OneToMany, Collection } from '@mikro-orm/core';
  import { BaseEntity } from '../../entities/base.entity';
  import { Post } from '../../post/entities/post.entity';
  
  @Entity()
  export class User extends BaseEntity {
    @Property({ unique: true })
    email!: string;
  
    @Property()
    name!: string;
  
    @OneToMany(() => Post, post => post.author)
    posts = new Collection<Post>(this);
  }
    