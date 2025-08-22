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

describe('CommunityService', () => {
  let service: CommunityService;
  let communityRepository: Repository<Community>;
  let commentRepository: Repository<Comment>;

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
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ... existing tests

  describe('createCommunity', () => {
    it('should create a community post', async () => {
      const createCommunityDto: CreateCommunityDto = { title: 'Test Title', content: 'Test Content' };
      const createdCommunity: Community = { id: 1, ...createCommunityDto };
      jest.spyOn(communityRepository, 'create').mockReturnValue(createdCommunity);
      jest.spyOn(communityRepository, 'save').mockResolvedValue(createdCommunity);

      const result = await service.createCommunity(createCommunityDto);

      expect(result).toEqual(createdCommunity);
      expect(communityRepository.create).toHaveBeenCalledWith(createCommunityDto);
      expect(communityRepository.save).toHaveBeenCalledWith(createdCommunity);
    });
  });


  describe('findAll', () => {
    it('should return paginated community posts', async () => {
      const pageOptionsDto: PageOptionsDto = { page: 1, limit: 10 };
      const communities: Community[] = [{ id: 1, title: 'Test Title', content: 'Test Content' }];
      const itemCount = communities.length;
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      const pageDto = new PageDto(communities, pageMetaDto);

      jest.spyOn(communityRepository, 'findAndCount').mockResolvedValue([communities, itemCount]);

      const result = await service.findAll(pageOptionsDto);
      expect(result).toEqual(pageDto);

    });
  });

  describe('updateCommunity', () => {
    it('should update a community post', async () => {
      const id = 1;
      const updateCommunityDto: UpdateCommunityDto = { title: 'Updated Title', content: 'Updated Content' };
      const updatedCommunity: Community = { id, ...updateCommunityDto };
      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(updatedCommunity);
      jest.spyOn(communityRepository, 'save').mockResolvedValue(updatedCommunity);

      const result = await service.updateCommunity(id, updateCommunityDto);
      expect(result).toEqual(updatedCommunity);
    });

    it('should throw NotFoundException if community post is not found', async () => {
      const id = 1;
      const updateCommunityDto: UpdateCommunityDto = { title: 'Updated Title', content: 'Updated Content' };
      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(undefined);


      await expect(service.updateCommunity(id, updateCommunityDto)).rejects.toThrow(NotFoundException);

    });
  });

  describe('deleteCommunity', () => {
    it('should delete a community post', async () => {
      const id = 1;
      jest.spyOn(communityRepository, 'delete').mockResolvedValue({ affected: 1 });

      await expect(service.deleteCommunity(id)).resolves.not.toThrow();
    });
  });
});

```