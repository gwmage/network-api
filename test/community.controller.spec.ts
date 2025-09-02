```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from '../src/community/community.controller';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/community.entity';
import { Repository } from 'typeorm';
import { CreateCommunityDto } from '../src/community/dto/create-community.dto';
import { UpdateCommunityDto } from '../src/community/dto/update-community.dto';
import { CreateCommentDto } from '../src/community/dto/create-comment.dto';
import { Comment } from '../src/community/comment.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateCommentDto } from '../src/community/dto/update-comment.dto';
import { PaginationQueryDto } from '../src/common/dtos/pagination-query.dto';
import { User } from '../src/users/user.entity';
import { PageDto } from '../src/common/dtos/page.dto';
import { PageMetaDto } from '../src/common/dtos/page-meta.dto';
import { PageOptionsDto } from '../src/common/dtos/page-options.dto';



describe('CommunityController', () => {
  let controller: CommunityController;
  let service: CommunityService;
  let communityRepository: Repository<Community>;
  let commentRepository: Repository<Comment>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
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
      ],
    }).compile();

    controller = module.get<CommunityController>(CommunityController);
    service = module.get<CommunityService>(CommunityService);
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('findAll', () => {
    it('should return an array of community posts with pagination', async () => {
      const paginationQueryDto: PaginationQueryDto = {
        limit: 10,
        offset: 0,
      };
      const posts: Community[] = [
        { id: 1, title: 'Post 1', content: 'Content 1' } as Community,
        { id: 2, title: 'Post 2', content: 'Content 2' } as Community,
      ];
      const pageMetaDto: PageMetaDto = new PageMetaDto({ paginationQueryDto, itemCount: posts.length });
      const pageDto: PageDto<Community> = new PageDto(posts, pageMetaDto);


      jest.spyOn(service, 'findAll').mockResolvedValue(pageDto);

      expect(await controller.findAll(paginationQueryDto)).toEqual(pageDto);
    });
  });

  // ... (Existing tests)
});

```