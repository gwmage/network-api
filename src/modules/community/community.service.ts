```typescript
import { Injectable } from '@nestjs/common';
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
    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post: { id: postId },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.commentRepository.save(newComment);
  }


  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update({ id, post: { id: postId } }, {
      ...updateCommentDto,
      updatedAt: new Date(),
    });
    return await this.commentRepository.findOneBy({ id, post: { id: postId } });
  }

  async removeComment(postId: number, id: number): Promise<void> {
    await this.commentRepository.delete({ id, post: { id: postId } });
  }
}
```