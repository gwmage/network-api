```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like, In, DeleteResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommunityRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  // ... (Existing post methods)

  async createComment(comment: Comment): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  async findAllCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { postId },
      order: { createdAt: 'ASC' }, // Order by creation time for proper display
    });
  }

  async findCommentById(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['replies'], // Load nested replies
    });
  }

  async updateComment(id: number, updatedComment: Comment): Promise<Comment | null> {
    await this.commentRepository.update(id, updatedComment);
    return this.findCommentById(id);
  }

  async deleteComment(id: number): Promise<DeleteResult> {
    // Use remove to delete the entity and its children (if any)
    // Requires cascades set up in entity relationships (e.g., in comment.entity.ts)
    const comment = await this.commentRepository.findOneBy({ id });
    return this.commentRepository.remove(comment);

  }
}
```