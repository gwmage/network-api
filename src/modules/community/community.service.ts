```typescript
import { Injectable, NotFoundException, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, FindOptionsWhere, Like } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/post.entity';
import { User } from '../auth/entities/user.entity';
import { NotificationService } from '../notification/notification.service';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';
import { Category } from './entities/category.entity';
import { Tag } from './entities/tag.entity';


@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Post)
    private communityPostRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @Inject(forwardRef(() => NotificationService))
    private notificationService: NotificationService,
  ) {}


  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { categoryIds, tagIds, ...postData } = createPostDto;
    const newPost = this.communityPostRepository.create({
      ...postData,
      author: user,
    });

    if (categoryIds) {
      newPost.categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
    }

    if (tagIds) {
      newPost.tags = await this.tagRepository.findBy({ id: In(tagIds) });
    }

    return await this.communityPostRepository.save(newPost);
  }


  async findAllPosts(
    page: number,
    pageSize: number,
    categories?: number[],
    tags?: number[],
    search?: string,
  ): Promise<{ posts: Post[]; totalCount: number }> {
    const queryBuilder = this.communityPostRepository.createQueryBuilder('post');

    if (categories) {
      queryBuilder.leftJoinAndSelect('post.categories', 'category').where('category.id IN (:...categories)', { categories });
    }

    if (tags) {
      queryBuilder.leftJoinAndSelect('post.tags', 'tag').where('tag.id IN (:...tags)', { tags });
    }

    if (search) {
      queryBuilder.andWhere('post.title LIKE :search OR post.content LIKE :search', { search: `%${search}%` });
    }

    queryBuilder.leftJoinAndSelect('post.author', 'author');
    queryBuilder.orderBy('post.createdAt', 'DESC');

    const totalCount = await queryBuilder.getCount();
    const posts = await queryBuilder.skip((page - 1) * pageSize).take(pageSize).getMany();
    return { posts, totalCount };


  }

  async findOnePost(id: number): Promise<Post> {
    const post = await this.communityPostRepository.findOne({ where: { id }, relations: ['author', 'categories', 'tags', 'comments'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, user: User): Promise<Post> {
    const { categoryIds, tagIds, ...postData } = updatePostDto;

    const post = await this.communityPostRepository.findOne({ where: { id, author: { id: user.id } }, relations: ['author', 'categories', 'tags'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found or you don't have permission to update it.`);
    }

    Object.assign(post, postData);
    if (categoryIds) {
        post.categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
    }
    if (tagIds) {
        post.tags = await this.tagRepository.findBy({ id: In(tagIds) });
    }
    return await this.communityPostRepository.save(post);

  }

  async removePost(id: number, user: User): Promise<void> {
    const post = await this.communityPostRepository.findOne({ where: { id, author: { id: user.id } } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found or you don't have permission to delete it.`);
    }

    await this.communityPostRepository.delete(id);
  }




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
    return await this.commentRepository.find({ where, relations: ['author', 'replies'] });
  }

  async findOneComment(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId }, relations: ['author', 'replies'] });
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