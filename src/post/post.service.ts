import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
      private readonly em: EntityManager,
    ) {}
  async create(createPostDto: CreatePostDto) {
    const post = this.em.create(Post, {
      title: createPostDto.title,
      body: createPostDto.body,
      author: this.em.getReference(User, createPostDto.authorId), // <- perfect for create()
    });
    await this.em.persistAndFlush(post);
    return post;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
