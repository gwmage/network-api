```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
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

  // ... (Existing code remains unchanged)

  async createComment(postId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const post = await this.communityPostRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post,
    });
    return await this.commentRepository.save(newComment);
  }

  async findAllComments(postId: number): Promise<Comment[]> {
    const post = await this.communityPostRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return await this.commentRepository.findBy({ post });
  }

  async findOneComment(postId: number, id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id, post: { id: postId } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id, post: { id: postId } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    await this.commentRepository.update({ id, post: { id: postId } }, updateCommentDto);
    return await this.commentRepository.findOneBy({ id, post: { id: postId } });
  }

  async removeComment(postId: number, id: number): Promise<void> {
    const comment = await this.commentRepository.findOneBy({ id, post: { id: postId } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    await this.commentRepository.delete({ id, post: { id: postId } });
  }
}
```