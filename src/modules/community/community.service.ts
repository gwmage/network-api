```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async searchPosts(keyword?: string): Promise<Post[]> {
    // Placeholder for actual search logic.  Will be implemented later.
    const mockPosts = [
      { id: 1, title: 'Mock Post 1' } as Post,
      { id: 2, title: 'Mock Post 2' } as Post,
    ];

    return mockPosts;
  }


  async getComment(postId: number, id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id, post: { id: postId } }, relations: ['user', 'parentComment'] });
    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }
    return comment;
  }
}
```