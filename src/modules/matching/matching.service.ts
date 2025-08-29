import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Matching } from './entities/matching.entity';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Matching) // Inject the Matching repository
    private matchingRepository: Repository<Matching>,
  ) {}

  async runMatching() {
    try {
      const users = await this.usersRepository.find();
      const matchedGroups = []; // Initialize an empty array
      // Log the users to check if they are fetched correctly.
      this.logger.log("Users: ", JSON.stringify(users));


      // ... (Your matching logic) ...

      const metrics = this.calculateMetrics(users, matchedGroups);
      this.logger.log("Matching Metrics: ", JSON.stringify(metrics));
      // Save the matched groups into the database using matchingRepository.
      // Iterate over matched groups.
      for (const group of matchedGroups) {
        const newMatching = this.matchingRepository.create({
          users: group, // Assuming 'group' contains user entities or IDs.
          // Add other relevant properties to the Matching entity.
        });
        await this.matchingRepository.save(newMatching);
      }

    } catch (error) {
      this.logger.error('Matching process failed:', error.stack);  // Log the entire error object
      // Log more details for debugging
      this.logger.error('Error details:', error.message, error.stack);
    } finally {
    }
  }

  // ... (rest of the code)
}
