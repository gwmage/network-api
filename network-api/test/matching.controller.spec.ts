import { Test, TestingModule } from '@nestjs/testing';
import { MatchingController } from '../src/modules/matching/matching.controller';
import { MatchingService } from '../src/modules/matching/matching.service';
import { MatchingResultsDto } from '../src/modules/matching/dto/matching-results.dto';

describe('MatchingController', () => {
  let controller: MatchingController;
  let matchingService: MatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchingController],
      providers: [MatchingService],
    }).compile();

    controller = module.get<MatchingController>(MatchingController);
    matchingService = module.get<MatchingService>(MatchingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate matching results', async () => {
    const mockResults: MatchingResultsDto = { groups: [] };
    jest.spyOn(matchingService, 'generateMatchingResults').mockResolvedValue(mockResults);

    const result = await controller.generateMatchingResults({});
    expect(result).toEqual(mockResults);

  });

  it('should retrieve matching results', async () => {
    const mockResults: MatchingResultsDto = { groups: [] };
    jest.spyOn(matchingService, 'retrieveMatchingResults').mockResolvedValue(mockResults)

    const result = await controller.retrieveMatchingResults();
    expect(result).toEqual(mockResults);
  });
});