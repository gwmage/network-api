```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/community.entity';
import { Repository } from 'typeorm';
import { Comment } from '../src/community/comment.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCommunityDto } from '../src/community/dto/create-community.dto';
import { UpdateCommunityDto } from '../src/community/dto/update-community.dto';
import { PageOptionsDto } from '../src/common/dtos/page-options.dto';
import { PageDto } from '../src/common/dtos/page.dto';
import { PageMetaDto } from '../src/common/dtos/page-meta.dto';
import { User } from '../src/users/user.entity';

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

  describe('findOne', () => {
    it('should return a community post', async () => {
      const id = 1;
      const community: Community = { id: 1, title: 'Test Title', content: 'Test Content' };
      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(community);

      const result = await service.findOne(id);

      expect(result).toEqual(community);
      expect(communityRepository.findOne).toHaveBeenCalledWith({ where: { id }, relations: ['comments', 'comments.user'] });
    });

    it('should throw NotFoundException if community post is not found', async () => {
      const id = 1;
      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });



  // ... other tests ...
});

```