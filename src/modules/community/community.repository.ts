```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOptionsWhere,
  Like,
  In,
  DeleteResult,
  FindManyOptions,
} from 'typeorm';
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
    options: {
      page?: number;
      limit?: number;
      filter?: string;
      categories?: string[];
      tags?: string[];
    } = {},
  ): Promise<[Post[], number]> {
    const { page = 1, limit = 10, filter, categories, tags } = options;
    const skip = (page - 1) * limit;
    const take = limit;

    const whereClause: FindOptionsWhere<Post> = {};

    if (filter) {
      whereClause.title = Like(`%${filter}%`); // Partial matching for title
      whereClause.content = Like(`%${filter}%`); // Partial matching for content
    }
    if (categories) {
      // Assuming Post has a categories field (adjust accordingly)
      // Could be a relation or a string array
      whereClause.categories = In(categories);
    }
    if (tags) {
      // Similar implementation as categories, adjust to your data model.
      whereClause.tags = In(tags);
    }

    const [items, totalItems] = await this.postRepository.findAndCount({
      where: whereClause,
      skip,
      take,
      order: { createdAt: 'DESC' }, // Order posts by creation date
    });

    return [items, totalItems];
  }

  async findPostById(id: number): Promise<Post | null> {
    return this.postRepository.findOne({ where: { id } });
  }

  // ... (rest of the code remains unchanged)
}
```