import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Profile } from '../profile/profile.entity';
import { Group } from '../group/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  // Example matching logic (replace with your actual implementation)
  async findMatches(userId: number): Promise<User[]> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        relations: ['profile'], // Ensure profile is loaded
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      // Accessing user.profile will not be undefined here
      const userProfile = user.profile;

      // Example: Find users with similar interests
      const matches = await this.usersRepository.find({
        where: {
          // Example criteria (replace with your actual matching criteria)
          profile: {
            interests: userProfile.interests, // Example using a common interest
          },
        },
        relations: ['profile'],
      });

      return matches;
    } catch (error) {
      this.logger.error(`Matching process failed: ${error.message}`, error.stack);
      throw error; // Re-throw the error after logging
    }
  }
}
