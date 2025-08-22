import { Injectable } from '@nestjs/common';
import { GetApplicationDto } from './dto/get-application.dto';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async getApplication(getApplicationDto: GetApplicationDto) {
    // Implement your logic to retrieve application data
    return this.applicationRepository.find(); // Example: return all applications
  } 
}