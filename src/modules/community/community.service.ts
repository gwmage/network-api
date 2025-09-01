```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createComment(postId: number, createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found'); // Should ideally not happen if authenticated
    }

    const parentCommentId = createCommentDto.parentCommentId;
    let parentComment: Comment | null = null;

    if (parentCommentId) {
      parentComment = await this.commentRepository.findOne({ where: { id: parentCommentId, post: { id: postId } } });
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }
    }
    const newComment = this.commentRepository.create({
      content: createCommentDto.content,
      post: post,
      author: user,
      parentComment: parentComment
    });

    return await this.commentRepository.save(newComment);



  }

  async findAllCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['author', 'parentComment'], // Include relations for nested comments
      order: { createdAt: 'ASC' } // Order by creation date
    });
  }


  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto, userId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id, post: { id: postId } }, relations: ['author'] });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.author.id !== userId) {
      throw new NotFoundException('Unauthorized to update this comment');
    }

    Object.assign(comment, updateCommentDto);
    return await this.commentRepository.save(comment);
  }

  async removeComment(postId: number, id: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id, post: { id: postId } }, relations: ['author'] });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.author.id !== userId) {
      throw new NotFoundException('Unauthorized to delete this comment');
    }

    await this.commentRepository.remove(comment);
  }
}

```