import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.em.create(User, dto);
    await this.em.persistAndFlush(user);
    return user;
  }

  async findAll() {
    return this.em.find(User, {}, { populate: ['posts'] });
  }

  async findOne(id: number) {
    return this.em.findOneOrFail(User, { id }, { populate: ['posts'] });
  }
}
