```typescript
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
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
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityPost)
    private communityPostRepository: Repository<CommunityPost>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  // ... other methods ...

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const post = await this.communityPostRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    return await this.commentRepository.find({ where: { post: { id: postId } }, relations: ['user', 'parentComment'] });
  }

  async createComment(postId: number, createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const { parentCommentId, ...rest } = createCommentDto;
    const post = await this.communityPostRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    const parentComment = parentCommentId ? await this.commentRepository.findOneBy({ id: parentCommentId }) : null;
    if (parentCommentId && !parentComment) {
      throw new NotFoundException('Parent comment not found.');
    }

    const newComment = this.commentRepository.create({
      ...rest,
      post,
      user,
      parentComment,
    });
    return await this.commentRepository.save(newComment);
  }


  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto, user: User): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id, post: { id: postId } }, relations: ['user'] });
    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }
    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('You are not authorized to update this comment.');
    }
    Object.assign(comment, updateCommentDto);
    return await this.commentRepository.save(comment);
  }

  async removeComment(postId: number, id: number, user: User): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id, post: { id: postId } }, relations: ['user'] });
    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }
    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('You are not authorized to delete this comment.');
    }
    await this.commentRepository.remove(comment);
  }
}
```