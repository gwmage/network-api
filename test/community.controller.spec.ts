```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from '../src/community/community.controller';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/community.entity';
import { Repository } from 'typeorm';
import { CreateCommunityDto } from '../src/community/dto/create-community.dto';
import { UpdateCommunityDto } from '../src/community/dto/update-community.dto';

describe('CommunityController', () => {
  let controller: CommunityController;
  let service: CommunityService;
  let communityRepository: Repository<Community>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [
        CommunityService,
        {
          provide: getRepositoryToken(Community),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CommunityController>(CommunityController);
    service = module.get<CommunityService>(CommunityService);
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCommunity', () => {
    it('should create a new community post', async () => {
      const createCommunityDto: CreateCommunityDto = { title: 'Test Title', content: 'Test Content' };
      const createdCommunity: Community = { id: 1, ...createCommunityDto };
      jest.spyOn(service, 'create').mockResolvedValue(createdCommunity);

      expect(await controller.createCommunity(createCommunityDto)).toEqual(createdCommunity);
    });
  });


  describe('updateCommunity', () => {
    it('should update an existing community post', async () => {
      const id = 1;
      const updateCommunityDto: UpdateCommunityDto = { title: 'Updated Title', content: 'Updated Content' };
      const updatedCommunity: Community = { id, ...updateCommunityDto };
      jest.spyOn(service, 'update').mockResolvedValue(updatedCommunity);

      expect(await controller.updateCommunity(id, updateCommunityDto)).toEqual(updatedCommunity);
    });
  });

  describe('deleteCommunity', () => {
    it('should delete a community post', async () => {
      const id = 1;
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      expect(await controller.deleteCommunity(id)).toBeUndefined();
    });
  });


  describe('findAll', () => {
    it('should return an array of community posts', async () => {
      const communities: Community[] = [{ id: 1, title: 'Test Title', content: 'Test Content' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(communities);
      
      expect(await controller.findAll()).toBe(communities);
    });
  });

});

```