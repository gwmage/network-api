```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SearchPostDto } from './dto/search-post.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create(createPostDto);
    return await this.postRepository.save(newPost);
  }

  async getPosts(
    page: number = 1,
    limit: number = 10,
    filter?: string,
    categories?: string[],
    tags?: string[],
  ): Promise<[Post[], number]> {
    const query = this.postRepository.createQueryBuilder('post');

    if (filter) {
      query.where('post.title LIKE :filter OR post.content LIKE :filter', { filter: `%${filter}%` });
    }

    if (categories && categories.length > 0) {
      query.andWhere('post.category IN (:...categories)', { categories });
    }

    if (tags && tags.length > 0) {
      query.andWhere('post.tags @> :tags', { tags: tags }); // Assuming tags is an array column
    }


    return query.skip((page - 1) * limit).take(limit).getManyAndCount();
  }

  async getPostById(id: number): Promise<Post> {
    return await this.postRepository.findOneBy({ id });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepository.update({ id }, updatePostDto);
    return await this.postRepository.findOneBy({ id });
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete({ id });
  }


  async searchPosts(searchPostDto: SearchPostDto): Promise<[Post[], number]> {
    const { page = 1, limit = 10, filter, categories, tags } = searchPostDto;
    return this.getPosts(page, limit, filter, categories, tags);
  }


  async createComment(postId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new Error('Post not found'); // Or use a custom exception
    }
    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post,
    });
    return await this.commentRepository.save(newComment);
  }

  async getComments(postId: number): Promise<Comment[]> {
    return await this.commentRepository.findBy({ post: { id: postId } });
  }

  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id, post: { id: postId } });
    if (!comment) {
        throw new Error('Comment not found');
    }
    await this.commentRepository.update({ id, post: { id: postId } }, updateCommentDto);
    return await this.commentRepository.findOneBy({ id, post: { id: postId } });
  }

  async deleteComment(postId: number, id: number): Promise<void> {
    const comment = await this.commentRepository.findOneBy({ id, post: { id: postId } });
    if (!comment) {
        throw new Error('Comment not found');
    }
    await this.commentRepository.delete({ id, post: { id: postId } });
  }
}

```