```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like, In, DeleteResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Category } from './entities/category.entity';
import { Tag } from './entities/tag.entity';

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

  // ... (Existing post and comment methods)

  async addCategoryToPost(postId: number, categoryId: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id: postId }, relations: ['categories'] });
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

    if (post && category) {
      post.categories.push(category);
      await this.postRepository.save(post);
    }
  }

  async addTagToPost(postId: number, tagId: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id: postId }, relations: ['tags'] });
    const tag = await this.tagRepository.findOne({ where: { id: tagId } });

    if (post && tag) {
      post.tags.push(tag);
      await this.postRepository.save(post);
    }
  }

  async removeCategoryFromPost(postId: number, categoryId: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id: postId }, relations: ['categories'] });
    if (post) {
      post.categories = post.categories.filter((category) => category.id !== categoryId);
      await this.postRepository.save(post);
    }
  }


  async removeTagFromPost(postId: number, tagId: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id: postId }, relations: ['tags'] });
    if (post) {
      post.tags = post.tags.filter((tag) => tag.id !== tagId);
      await this.postRepository.save(post);
    }
  }

  // Existing methods...
}

```