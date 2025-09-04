import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMatchingInputDto } from './dto/user-matching-input.dto';
import { MatchingGroupDto } from './dto/matching-group.dto';
import { MatchingGroup } from './entities/matching-group.entity';
import { MatchExplanation } from './entities/match-explanation.entity';
import { User } from '../auth/entities/user.entity';
import { MatchingResultsDto } from './dto/matching-results.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(MatchingGroup)
    private matchingGroupRepository: Repository<MatchingGroup>,
    @InjectRepository(MatchExplanation)
    private matchExplanationRepository: Repository<MatchExplanation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async generateMatchingResults(input: UserMatchingInputDto): Promise<MatchingResultsDto> {
    this.logger.log('Generating matching results...');
    const start = Date.now();

    let users: User[] = [];
    if (input.userIds) {
      users = await this.userRepository.findByIds(input.userIds);
    } else {
      users = await this.userRepository.find();
    }

    const groups = this.groupUsers(users);
    const notificationId = uuidv4();
    const end = Date.now();
    this.logger.log(`Matching took ${end - start}ms`);

    const results: MatchingResultsDto = { groups, notificationId };

    return results;
  }


  async runMatching(): Promise<void> {
    this.logger.log('Running weekly matching...');
    const users = await this.userRepository.find();
    const groups = this.groupUsers(users);

    // Save the groups to the database.  Clear out old groups first.
    await this.matchingGroupRepository.clear();
    const matchingGroups = groups.map(group => {
      const matchingGroup = new MatchingGroup();
      matchingGroup.users = group;
      return matchingGroup;
    });

    await this.matchingGroupRepository.save(matchingGroups);
    this.logger.log('Matching completed and saved.');
  }

  async retrieveMatchingResults(userId?: number): Promise<MatchingResultsDto> {
    this.logger.log('Retrieving matching results...');
    let groups = await this.matchingGroupRepository.find({ relations: ['users'] });

    if (userId) {
      groups = groups.filter(group => group.users.some(user => user.id === userId));
    }
    return { groups: groups.map(group => ({ users: group.users })), notificationId: undefined }; // Adjust mapping as needed
  }


  private groupUsers(users: User[]): MatchingGroupDto[] {
    // Placeholder implementation - replace with actual matching logic
    const groups: MatchingGroupDto[] = [];
    const groupSize = 5;

    for (let i = 0; i < users.length; i += groupSize) {
      groups.push({ users: users.slice(i, i + groupSize) });
    }

    return groups;
  }
}