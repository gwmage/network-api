```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CommunityPost } from './entities/community-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
import { FindManyOptions } from 'typeorm';
import { PaginatedCommunityPostsDto } from './dto/paginated-community-posts.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityPost)
    private communityPostRepository: Repository<CommunityPost>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommunityPostDto: CreateCommunityPostDto): Promise<CommunityPost> {
    const newPost = this.communityPostRepository.create(createCommunityPostDto);
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
      skip: (page - 1) * limit,
      take: limit,
      where: {},
    };

    if (filter) {
      options.where = [
        { title: Like(`%${filter}%`) },
        { content: Like(`%${filter}%`) },
      ];
    }

    if (categories) {
      options.where = { ...options.where, category: In(categories) };
    }

    if (tags) {
      options.where = { ...options.where, tags: In(tags) };
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
    const post = await this.communityPostRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updateCommunityPostDto: UpdateCommunityPostDto): Promise<CommunityPost> {
    const post = await this.findOne(id);
    Object.assign(post, updateCommunityPostDto);
    return await this.communityPostRepository.save(post);

  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.communityPostRepository.remove(post);
  }

  async createComment(postId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const post = await this.findOne(postId);
    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post: { id: postId },
    });
    return await this.commentRepository.save(newComment);
  }

  async findAllComments(postId: number): Promise<Comment[]> {
    await this.findOne(postId); // Check if post exists
    return await this.commentRepository.findBy({ post: { id: postId } });
  }

  async findOneComment(postId: number, id: number): Promise<Comment> {
    await this.findOne(postId); // Check if post exists
    const comment = await this.commentRepository.findOneBy({ id, post: { id: postId } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOneComment(postId, id);
    Object.assign(comment, updateCommentDto);
    return await this.commentRepository.save(comment);
  }

  async removeComment(postId: number, id: number): Promise<void> {
    const comment = await this.findOneComment(postId, id);
    await this.commentRepository.remove(comment);
  }
}
```