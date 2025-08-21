```typescript
import { Injectable } from '@nestjs/common';
import { CommunityPost } from './entities/community-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
import { FindManyOptions, Like } from 'typeorm';
import { PaginatedCommunityPostsDto } from './dto/paginated-community-posts.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityPost)
    private communityPostRepository: Repository<CommunityPost>,
  ) {}

  async create(createCommunityPostDto: CreateCommunityPostDto): Promise<CommunityPost> {
    const newPost = this.communityPostRepository.create(createCommunityPostDto);
    return await this.communityPostRepository.save(newPost);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter?: string,
  ): Promise<PaginatedCommunityPostsDto> {
    const options: FindManyOptions<CommunityPost> = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (filter) {
      options.where = [
        { title: Like(`%${filter}%`) },
        { content: Like(`%${filter}%`) },
      ];
    }

    const [items, total] = await this.communityPostRepository.findAndCount(options);

    return {
      items,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<CommunityPost> {
    return await this.communityPostRepository.findOneBy({ id });
  }

  async update(id: number, updateCommunityPostDto: UpdateCommunityPostDto): Promise<CommunityPost> {
    await this.communityPostRepository.update(id, updateCommunityPostDto);
    return await this.communityPostRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.communityPostRepository.delete(id);
  }
}
```