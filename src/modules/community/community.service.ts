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

  async createPost(createCommunityPostDto: CreateCommunityPostDto, author: User): Promise<CommunityPost> {
    const newPost = this.communityPostRepository.create({
      ...createCommunityPostDto,
      author,
    });
    return await this.communityPostRepository.save(newPost);
  }

  async findAllPosts(
    page: number = 1,
    limit: number = 10,
    category?: string,
    tags?: string[],
  ): Promise<PaginatedCommunityPostsDto> {
    const options: FindManyOptions<CommunityPost> = {
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
      where: {} as FindOptionsWhere<CommunityPost>,
    };

    if (category) {
      options.where.category = category;
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

  async findOnePost(id: number): Promise<CommunityPost> {
    const post = await this.communityPostRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async updatePost(id: number, updateCommunityPostDto: UpdateCommunityPostDto): Promise<CommunityPost> {
    await this.communityPostRepository.update(id, updateCommunityPostDto);
    return await this.findOnePost(id);
  }

  async removePost(id: number): Promise<void> {
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

  async findAllCommentsByPost(postId: number): Promise<Comment[]> {
    return await this.commentRepository.findBy({ post: { id: postId } });
  }

  async findOneComment(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }
    return comment;
  }

  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update({ id: commentId }, updateCommentDto);
    return await this.findOneComment(commentId);
  }

  async removeComment(commentId: number): Promise<void> {
    await this.commentRepository.delete(commentId);
  }
}
```