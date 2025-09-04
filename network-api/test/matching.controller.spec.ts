```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MatchingController } from '../src/modules/matching/matching.controller';
import { MatchingService } from '../src/modules/matching/matching.service';
import { MatchingResultsDto } from '../src/modules/matching/dto/matching-results.dto';
import { UserDataDto } from '../src/modules/matching/dto/user-data.dto';
import { MatchingWeightsDto } from '../src/modules/matching/dto/matching-weights.dto';

describe('MatchingController', () => {
  let controller: MatchingController;
  let service: MatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchingController],
      providers: [
        {
          provide: MatchingService,
          useValue: {
            generateMatchingResults: jest.fn(),
            findMatches: jest.fn(),
            getUserData: jest.fn(),
            storeMatchingResults: jest.fn(),
            retrieveMatchingResults: jest.fn(),
            updateMatchingWeights: jest.fn(),
            runPerformanceTests: jest.fn(),
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
    const input = { userIds: [1, 2, 3] };
    await controller.generateMatchingResults(input);
    expect(service.generateMatchingResults).toHaveBeenCalledWith(input);
  });

  it('should find matches', async () => {
    const userData: UserDataDto[] = []; // Provide some mock user data
    await controller.findMatches(userData);
    expect(service.findMatches).toHaveBeenCalledWith(userData);
  });

  it('should get user data', async () => {
    const userIds = [1, 2, 3];
    await controller.getUserData(userIds);

    expect(service.getUserData).toHaveBeenCalledWith(userIds);


  });

  it('should store matching results', async () => {
    const results: MatchingResultsDto = { groups: [], notificationId: 'some_id' };
    await controller.storeMatchingResults(results);
    expect(service.storeMatchingResults).toHaveBeenCalledWith(results);
  });

  it('should retrieve matching results', async () => {

    const userId = 1;
    await controller.retrieveMatchingResults(userId);
    expect(service.retrieveMatchingResults).toHaveBeenCalledWith(userId);
  });

  it('should update matching weights', async () => {
    const weights: MatchingWeightsDto = { region: 1, preferences: 1, interests: 1 };
    controller.updateMatchingWeights(weights);
    expect(service.updateMatchingWeights).toHaveBeenCalledWith(weights);
  });



  it('should run performance tests', async () => {

    await controller.runPerformanceTests();
    expect(service.runPerformanceTests).toHaveBeenCalled();


  });



});
```
---[END_OF_FILES]---