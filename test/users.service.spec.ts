```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Filtering Logic', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', city: 'New York', interests: ['reading', 'coding'] },
      { id: 2, name: 'Jane Doe', city: 'London', interests: ['coding', 'traveling'] },
      { id: 3, name: 'Peter Pan', city: 'New York', interests: ['sports', 'music'] },
    ];

    beforeEach(async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
    });


    it('should filter by city', async () => {
      const filter = { city: 'New York' };
      const result = await service.findAll(filter);
      expect(userRepository.find).toHaveBeenCalledWith({ where: filter });
      expect(result).toEqual(mockUsers.filter(user => user.city === 'New York'));
    });

    it('should filter by interests', async () => {
      const filter = { interests: 'coding' };
      const result = await service.findAll(filter);
      expect(userRepository.find).toHaveBeenCalledWith({ where: { interests: 'coding' } });
       expect(result).toEqual(mockUsers.filter(user => user.interests.includes('coding')));
    });


    it('should filter by multiple criteria', async () => {
      const filter = { city: 'New York', interests: 'coding' };
      const result = await service.findAll(filter);
            expect(userRepository.find).toHaveBeenCalledWith({ where: { city: 'New York', interests: 'coding' } });

      expect(result).toEqual(mockUsers.filter(user => user.city === 'New York' && user.interests.includes('coding')));
    });

    it('should return all users when no filter is provided', async () => {
      const result = await service.findAll({});
      expect(userRepository.find).toHaveBeenCalledWith({}); // or appropriate empty filter object for TypeORM 
      expect(result).toEqual(mockUsers);
    });

  });
});

```