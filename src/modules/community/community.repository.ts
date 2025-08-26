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

  async createPost(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async findAllPosts(
    where?: FindOptionsWhere<Post>,
    skip?: number,
    take?: number,
  ): Promise<Post[]> {
    return this.postRepository.find({
      where,
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  async findPostById(id: number): Promise<Post | null> {
    return this.postRepository.findOne({ where: { id } });
  }

  async updatePost(id: number, updatedPost: Post): Promise<Post | null> {
    await this.postRepository.update(id, updatedPost);
    return this.findPostById(id);
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return this.postRepository.delete(id);
  }


  async createComment(comment: Comment): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  async findAllCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { postId },
      order: { createdAt: 'ASC' },
      relations: ['replies'],
    });
  }

  async findCommentById(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['replies'],
    });
  }

  async updateComment(id: number, updatedComment: Comment): Promise<Comment | null> {
    await this.commentRepository.update(id, updatedComment);
    return this.findCommentById(id);
  }

  async deleteComment(id: number): Promise<DeleteResult> {
    const comment = await this.commentRepository.findOneBy({ id });
    return this.commentRepository.remove(comment);
  }
}

```