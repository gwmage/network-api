import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/modules/matching/matching.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MatchingGroup } from '../src/modules/matching/entities/matching-group.entity';
import { MatchExplanation } from '../src/modules/matching/entities/match-explanation.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UserMatchingInputDto } from '../src/modules/matching/dto/user-matching-input.dto';


describe('MatchingService', () => {
  let service: MatchingService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchingService,
        {
          provide: getRepositoryToken(MatchingGroup),
          useValue: {}, // Mock repository
        },
        {
          provide: getRepositoryToken(MatchExplanation),
          useValue: {}, // Mock repository
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findByIds: jest.fn(),
            find: jest.fn(),
          }, // Mock repository
        },
      ],
    }).compile();

    service = module.get<MatchingService>(MatchingService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate matching results with provided user IDs', async () => {
    const mockUsers: User[] = [{ id: 1 } as User, { id: 2 } as User];
    (userRepository.findByIds as jest.Mock).mockResolvedValue(mockUsers);
    const input: UserMatchingInputDto = { userIds: [1, 2] };
    const result = await service.generateMatchingResults(input);
    expect(result.groups).toBeDefined(); // Check if groups are generated
    expect(result.notificationId).toBeDefined(); // Check if notification ID is generated
    expect(userRepository.findByIds).toHaveBeenCalledWith(input.userIds);

  });

  it('should generate matching results for all users', async () => {
    const mockUsers: User[] = [{ id: 1 } as User, { id: 2 } as User];
    (userRepository.find as jest.Mock).mockResolvedValue(mockUsers);
    const input: UserMatchingInputDto = {};
    const result = await service.generateMatchingResults(input);

    expect(result.groups).toBeDefined(); // Check if groups are generated
    expect(result.notificationId).toBeDefined(); // Check if notification ID is generated
    expect(userRepository.find).toHaveBeenCalled();
  });



});