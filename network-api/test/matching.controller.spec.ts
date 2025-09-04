import { Test, TestingModule } from '@nestjs/testing';
import { MatchingController } from '../src/modules/matching/matching.controller';
import { MatchingService } from '../src/modules/matching/matching.service';
import { UserMatchingInputDto } from '../src/modules/matching/dto/user-matching-input.dto';
import { MatchingResultsDto } from '../src/modules/matching/dto/matching-results.dto';
import { User } from '../src/modules/auth/entities/user.entity';

describe('MatchingController', () => {
  let controller: MatchingController;
  let service: MatchingService;

  const mockMatchingResults: MatchingResultsDto = {
    groups: [], // Populate with mock data
    notificationId: 'some-uuid',
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchingController],
      providers: [
        {
          provide: MatchingService,
          useValue: {
            generateMatchingResults: jest.fn().mockResolvedValue(mockMatchingResults),
            retrieveMatchingResults: jest.fn().mockResolvedValue(mockMatchingResults),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchingController>(MatchingController);
    service = module.get<MatchingService>(MatchingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate matching results', async () => {
    const input: UserMatchingInputDto = { userIds: [1, 2, 3] };
    expect(await controller.generateMatchingResults(input)).toEqual(mockMatchingResults);
    expect(service.generateMatchingResults).toHaveBeenCalledWith(input);
  });

  it('should retrieve matching results', async () => {
    const userId = 1;
    expect(await controller.retrieveMatchingResults(userId)).toEqual(mockMatchingResults);
    expect(service.retrieveMatchingResults).toHaveBeenCalledWith(userId);
  });


});