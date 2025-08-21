```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like, In } from 'typeorm';
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

  async createPost(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async findAllPosts(
    page: number = 1,
    perPage: number = 20,
    category?: string,
    tags?: string[],
  ): Promise<[Post[], number]> {
    const whereClause: FindOptionsWhere<Post> = {};
    if (category) {
      whereClause.category = category;
    }
    if (tags && tags.length > 0) {
      whereClause.tags = In(tags); // Use In for exact match
    }

    return this.postRepository.findAndCount({
      where: whereClause,
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }


  async findPostById(id: number): Promise<Post | null> {
    return this.postRepository.findOneBy({ id });
  }

  async updatePost(id: number, updatedPost: Post): Promise<Post | null> {
    await this.postRepository.update(id, updatedPost);
    return this.findPostById(id);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }


  async createComment(comment: Comment): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  async findAllCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.findBy({ postId });
  }

  async findCommentById(id: number): Promise<Comment | null> {
    return this.commentRepository.findOneBy({ id });
  }

  async updateComment(id: number, updatedComment: Comment): Promise<Comment | null> {
    await this.commentRepository.update(id, updatedComment);
    return this.findCommentById(id);
  }

  async deleteComment(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
```