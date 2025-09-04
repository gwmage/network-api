```typescript
import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { PaginatedCommunityPostsDto } from './dto/paginated-community-posts.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/post.entity'; // Import Post entity
import { User } from '../auth/entities/user.entity'; // Correct import path
import { NotificationService } from '../notification/notification.service';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';


@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Post) // Inject Post repository
    private communityPostRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @Inject(forwardRef(() => NotificationService))
    private notificationService: NotificationService,
  ) {}

  // ... (Existing Post methods)

  async createComment(postId: number, createCommentDto: CreateCommentDto, author: User): Promise<Comment> {
    const post = await this.communityPostRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post,
      author,
      parentComment: createCommentDto.parentCommentId ? { id: createCommentDto.parentCommentId } : null,
    });

    const createdComment = await this.commentRepository.save(newComment);

    // Create notification
    const notificationDto: CreateNotificationDto = {
      userId: author.id.toString(),
      commentId: createdComment.id.toString(),
      postId: postId.toString(),
    };
    await this.notificationService.createNotification(notificationDto);

    return createdComment;
  }


  async findAllCommentsByPost(postId: number, parentCommentId?: number): Promise<Comment[]> {
    const where: FindOptionsWhere<Comment> = { post: { id: postId } };
    if (parentCommentId) {
      where.parentCommentId = parentCommentId;
    }
    return await this.commentRepository.find({ where, relations: ['author', 'replies'] }); // Include author and replies
  }

  async findOneComment(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId }, relations: ['author', 'replies'] }); // Include relations
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }
    return comment;
  }

  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {

    const comment = await this.commentRepository.findOneBy({id: commentId});
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    // Create notification for updates (if content changed)
    if(updateCommentDto.content && updateCommentDto.content != comment.content) {
        const notificationDto: CreateNotificationDto = {
            userId: comment.author.id.toString(),
            commentId: commentId.toString(),
            postId: comment.post.id.toString(),
        };
        await this.notificationService.createNotification(notificationDto);

    }

    await this.commentRepository.update({ id: commentId }, updateCommentDto);
    return await this.findOneComment(commentId);
  }

  async removeComment(commentId: number): Promise<void> {
    await this.commentRepository.delete(commentId);
  }
}

```