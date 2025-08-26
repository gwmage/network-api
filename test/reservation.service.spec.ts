```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../src/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/reservation/reservation.entity';
import { Repository } from 'typeorm';
import { Restaurant } from '../src/restaurant/restaurant.entity';
import { User } from '../src/users/user.entity';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { AxiosError } from 'axios';

describe('ReservationService', () => {
  let service: ReservationService;
  let reservationRepository: Repository<Reservation>;
  let restaurantRepository: Repository<Restaurant>;
  let userRepository: Repository<User>;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ReservationService,
        ConfigService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Restaurant),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
    restaurantRepository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ... existing tests ...

  it('should handle successful API call', async () => {
    const mockResponse = { data: { success: true } };
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
    jest.spyOn(configService, 'get').mockReturnValue('mockApiKey');

    const result = await service.checkRestaurantAvailability({} as any); // Replace with actual DTO type if available
    expect(result).toEqual(mockResponse.data);
    expect(httpService.get).toHaveBeenCalled();
    expect(configService.get).toHaveBeenCalledWith('RESTAURANT_API_KEY');
  });


  it('should handle invalid API key', async () => {
    const mockError = new AxiosError();
    mockError.response = { status: 401, data: { message: 'Invalid API key' } };
    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => mockError));


    await expect(service.checkRestaurantAvailability({} as any)).rejects.toThrowError('Invalid API key');

  });

  it('should handle network errors', async () => {
    const mockError = new AxiosError();
    mockError.message = 'Network Error';
    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => mockError));

    await expect(service.checkRestaurantAvailability({} as any)).rejects.toThrowError('Network Error');
  });


  it('should handle unavailable data', async () => {
    const mockResponse = { data: { success: false, message: 'Restaurant unavailable' } };
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    await expect(service.checkRestaurantAvailability({} as any)).rejects.toThrowError('Restaurant unavailable');
  });
});

```