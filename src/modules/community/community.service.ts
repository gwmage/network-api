```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommunityPost } from './entities/community-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
import { FindManyOptions } from 'typeorm';
import { PaginatedCommunityPostsDto } from './dto/paginated-community-posts.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';


@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityPost)
    private communityPostRepository: Repository<CommunityPost>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  // ... (Other methods remain unchanged)

  async searchPosts(
    page: number = 1,
    limit: number = 10,
    filter?: string,
    categories?: string[],
    tags?: string[],
    sortBy?: string, // Add sorting parameter
  ): Promise<PaginatedCommunityPostsDto> {


    const whereClause: FindOptionsWhere<CommunityPost> = {};

    if (filter) {
      whereClause.title = Like(`%${filter}%`); // Search by title (can be extended to other fields)
    }

    if (categories) {
      whereClause.categories = {
        id: In(categories.map(Number)),
      };
    }
    if (tags) {
      whereClause.tags = {
        id: In(tags.map(Number)),
      };
    }
    const queryBuilder = this.communityPostRepository.createQueryBuilder('post');

    if (sortBy) {
      switch (sortBy) {
        case 'newest':
          queryBuilder.orderBy('post.createdAt', 'DESC');
          break;
        // Add other sorting options (e.g., relevance, popularity) as needed
        default:
          queryBuilder.orderBy('post.createdAt', 'DESC'); // Default to newest
      }
    }

    const [items, totalItems] = await queryBuilder
    .leftJoinAndSelect('post.categories', 'categories')
    .leftJoinAndSelect('post.tags', 'tags')
    .where(whereClause)
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
      },
    };
  }




  // ... (Rest of the service code remains unchanged)


}
```