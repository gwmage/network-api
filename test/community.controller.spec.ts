import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from '../src/modules/community/community.controller';
import { CommunityService } from '../src/modules/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/modules/community/entities/community.entity';
import { Repository } from 'typeorm';
import { CreateCommunityDto } from '../src/modules/community/dto/create-community.dto';
import { UpdateCommunityDto } from '../src/modules/community/dto/update-community.dto';

describe('CommunityController', () => {
  let controller: CommunityController;
  let service: CommunityService;
  let repository: Repository<Community>;

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
    repository = module.get<Repository<Community>>(getRepositoryToken(Community));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
