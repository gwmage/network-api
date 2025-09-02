```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommunityPost } from './entities/community-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { PaginatedCommunityPostsDto } from './dto/paginated-community-posts.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityPost)
    private communityPostRepository: Repository<CommunityPost>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommunityPostDto: CreateCommunityPostDto, author: User): Promise<CommunityPost> {
    const newPost = this.communityPostRepository.create({
      ...createCommunityPostDto,
      author,
    });
    return await this.communityPostRepository.save(newPost);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter?: string,
    categories?: string[],
    tags?: string[],
  ): Promise<PaginatedCommunityPostsDto> {
    const options: FindManyOptions<CommunityPost> = {
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
      where: {} as FindOptionsWhere<CommunityPost>,
    };

    if (filter) {
      options.where = [
        { title: Like(`%${filter}%`) },
        { content: Like(`%${filter}%`) },
      ];
    }

    if (categories) {
      options.where.category = In(categories);
    }

    if (tags) {
      options.where.tags = In(tags);
    }

    const [items, total] = await this.communityPostRepository.findAndCount(options);

    return {
      items,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<CommunityPost> {
    const post = await this.communityPostRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updateCommunityPostDto: UpdateCommunityPostDto): Promise<CommunityPost> {
    await this.communityPostRepository.update(id, updateCommunityPostDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.communityPostRepository.delete(id);
  }

  async createComment(postId: number, createCommentDto: CreateCommentDto, author: User): Promise<Comment> {
    const post = await this.communityPostRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post,
      author,
    });
    return await this.commentRepository.save(newComment);
  }

  async findAllComments(postId: number): Promise<Comment[]> {
    return await this.commentRepository.findBy({ post: { id: postId } });
  }

  async findOneComment(postId: number, id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id, post: { id: postId } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update({ id, post: { id: postId } }, updateCommentDto);
    return await this.findOneComment(postId, id);
  }

  async removeComment(postId: number, id: number): Promise<void> {
    await this.commentRepository.delete({ id, post: { id: postId } });
  }
}
```