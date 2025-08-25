```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/entities/community.entity';
import { Comment } from '../src/community/entities/comment.entity';
import { User } from '../src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../src/community/dto/create-comment.dto';
import { UpdateCommentDto } from '../src/community/dto/update-comment.dto';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '../src/common/dtos/page.dto';
import { PageMetaDto } from '../src/common/dtos/page-meta.dto';


describe('CommunityService', () => {
  let service: CommunityService;
  let communityRepository: Repository<Community>;
  let commentRepository: Repository<Comment>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunityService,
        {
          provide: getRepositoryToken(Community),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ... other test cases

  describe('findAll', () => {
    it('should return paginated posts', async () => {
      const page = 1;
      const limit = 10;
      const filter = 'test';
      const categories = ['category1', 'category2'];
      const tags = ['tag1', 'tag2'];


      const mockPosts: Community[] = [];
      const mockTotalCount = 20;

      jest.spyOn(communityRepository, 'findAndCount').mockResolvedValue([mockPosts, mockTotalCount]);

      const result: PageDto<Community> = await service.findAll({ page, limit, filter, categories, tags });

      expect(communityRepository.findAndCount).toHaveBeenCalledWith({
        where: {
          title: expect.stringContaining(filter),
          categories: { name: expect.arrayContaining(categories.map((category) => ({ name: category }))) },
          tags: { name: expect.arrayContaining(tags.map((tag) => ({ name: tag }))) },
        },

        take: limit,
        skip: (page - 1) * limit,
      });

      expect(result.data).toEqual(mockPosts);
      expect(result.meta).toEqual(new PageMetaDto({ pageOptionsDto: { page, limit }, itemCount: mockTotalCount }));

    });



    it('should return all posts without pagination if limit is undefined or 0', async () => {
      const filter = 'test';
      const categories = ['category1', 'category2'];
      const tags = ['tag1', 'tag2'];

      const mockPosts: Community[] = [{id: 1, title: 'Test Post', content: 'Post Content'} as Community ];

      jest.spyOn(communityRepository, 'find').mockResolvedValue(mockPosts);

      const result = await service.findAll({ filter, categories, tags });

      expect(communityRepository.find).toHaveBeenCalledWith({
        where: {
          title: expect.stringContaining(filter),
          categories: { name: expect.arrayContaining(categories.map((category) => ({ name: category }))) },
          tags: { name: expect.arrayContaining(tags.map((tag) => ({ name: tag }))) },
        },
      });


      expect(result.data).toEqual(mockPosts);

    });
  });


});

```