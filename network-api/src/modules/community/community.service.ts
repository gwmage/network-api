```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createComment(postId: number, createCommentDto: CreateCommentDto, author: any): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found.`);
    }

    const parentCommentId = createCommentDto.parentCommentId ? parseInt(createCommentDto.parentCommentId, 10) : null;
    let parentComment: Comment | null = null;
    if (parentCommentId) {
      parentComment = await this.commentRepository.findOne({ where: { id: parentCommentId } });
      if (!parentComment) {
        throw new NotFoundException(`Parent comment with ID ${parentCommentId} not found.`);
      }
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      post,
      author,
      parentComment,
    });


    return this.commentRepository.save(comment);
  }



  findAllComments(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['author', 'replies', 'parentComment'], // Include nested comments
      order: { createdAt: 'DESC' },
    });
  }

  async findOneComment(postId: number, id: number): Promise<Comment | null> {
    const comment = await this.commentRepository.findOne({ where: { id, post: { id: postId } }, relations: ['author', 'replies'] });
    return comment;
  }

  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<Comment | null> {
    const comment = await this.findOneComment(postId, id);
    if (!comment) {
      return null;
    }

    Object.assign(comment, updateCommentDto);

    return this.commentRepository.save(comment);
  }

  async removeComment(postId: number, id: number): Promise<void> {
    const comment = await this.findOneComment(postId, id);
    if (!comment) {
      return;
    }
    await this.commentRepository.remove(comment);
  }
}
```