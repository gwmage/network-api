```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like, In, DeleteResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Category } from './entities/category.entity';
import { Tag } from './entities/tag.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FindAllCommentsDto } from './dto/findAllComments.dto';


@Injectable()
export class CommunityRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAllPosts(options: { page: number; limit: number; categories?: number[]; tags?: number[]; search?: string }): Promise<[Post[], number]> {
    const { page, limit, categories, tags, search } = options;
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    if (categories) {
      queryBuilder.leftJoinAndSelect('post.categories', 'category').where('category.id IN (:...categories)', { categories });
    }

    if (tags) {
      queryBuilder.leftJoinAndSelect('post.tags', 'tag').where('tag.id IN (:...tags)', { tags });
    }

    if (search) {
      queryBuilder.where('post.title LIKE :search OR post.content LIKE :search', { search: `%${search}%` });
    }

    return queryBuilder
      .leftJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  }

  async findOnePost(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ['author', 'categories', 'tags', 'comments', 'comments.author'] });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async removePost(id: number): Promise<DeleteResult> {
    return this.postRepository.delete(id);
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }

  async findAllComments(options: FindAllCommentsDto): Promise<[Comment[], number]> {
    const { page, limit, postId } = options;
    const queryBuilder = this.commentRepository.createQueryBuilder('comment');


    if (postId) {
      queryBuilder.where('comment.postId = :postId', { postId });
    }

    return queryBuilder
    .leftJoinAndSelect('comment.author', 'author')
    .orderBy('comment.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  }

  async findOneComment(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id }, relations: ['author'] });
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async removeComment(id: number): Promise<DeleteResult> {
    return this.commentRepository.delete(id);
  }
}

```