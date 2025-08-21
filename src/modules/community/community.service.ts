```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async createComment(postId: number, createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post: { id: postId },
      user,
    });
    return await this.commentRepository.save(newComment);
  }


  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto, user: User): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id, post: { id: postId } });
    if (!comment) {
      throw new Error('Comment not found.');
    }
    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('You are not authorized to update this comment.');
    }
    await this.commentRepository.update({ id, post: { id: postId } }, updateCommentDto);
    return await this.commentRepository.findOneBy({ id, post: { id: postId } });
  }

  async removeComment(postId: number, id: number, user: User): Promise<void> {
    const comment = await this.commentRepository.findOneBy({ id, post: { id: postId } });
    if (!comment) {
      throw new Error('Comment not found.');
    }
    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('You are not authorized to delete this comment.');
    }
    await this.commentRepository.delete({ id, post: { id: postId } });
  }
}
```