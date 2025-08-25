```typescript
        providers: [
        MatchingService,
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MatchingService>(MatchingService);
    profileRepository = module.get<Repository<Profile>>(getRepositoryToken(Profile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('filterMatches', () => {
    // ... existing tests
  });

  describe('performance test', () => {
    it('should handle large number of profiles efficiently', async () => {
      const numProfiles = 1000;
      const mockProfiles: Profile[] = [];
      for (let i = 0; i < numProfiles; i++) {
        mockProfiles.push({
          id: i + 1,
          userId: i + 1,
          interests: ['reading', 'hiking', 'coding', 'gaming'].slice(0, Math.floor(Math.random() * 4) + 1),
          region: ['서울', '부산', '대구'][Math.floor(Math.random() * 3)],
          // ... other properties
        } as Profile);
      }

      jest.spyOn(profileRepository, 'find').mockResolvedValue(mockProfiles);

      const startTime = performance.now();
      const result = await service.findMatch(1); // or any userId
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      console.log(`Execution time for ${numProfiles} profiles: ${executionTime} ms`);
      expect(executionTime).toBeLessThan(500); // Adjust threshold as needed
    }, 10000); // Increase timeout if necessary


    it('should handle various input sizes', async () => {
      const profileSizes = [10, 100, 500, 1000];
      const expectedMaxTimes = [10, 50, 250, 500]; // Example: Adjust as needed

      for (let i = 0; i < profileSizes.length; i++) {
        const numProfiles = profileSizes[i];
        const maxTime = expectedMaxTimes[i];
        const mockProfiles: Profile[] = [];
        for (let j = 0; j < numProfiles; j++) {
          mockProfiles.push({
            id: j + 1,
            userId: j + 1,
            interests: ['reading', 'hiking', 'coding', 'gaming'].slice(0, Math.floor(Math.random() * 4) + 1),
            region: ['서울', '부산', '대구'][Math.floor(Math.random() * 3)],
            // ... other properties
          } as Profile);
        }

        jest.spyOn(profileRepository, 'find').mockResolvedValue(mockProfiles);
        const startTime = performance.now();
        await service.findMatch(1);
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(`Execution time for ${numProfiles} profiles: ${executionTime} ms`);

        expect(executionTime).toBeLessThan(maxTime);
      }
    }, 30000);

  });
});

```
