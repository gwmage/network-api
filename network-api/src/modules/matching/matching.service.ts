```typescript
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
import { UserDataDto } from './dto/user-data.dto';
import { MatchingWeightsDto } from './dto/matching-weights.dto';
import { writeFileSync } from 'fs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MatchingCriteriaDto } from './dto/matching-criteria.dto';
import { MatchingStatisticsDto } from './dto/matching-statistics.dto';


@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);
  private matchingWeights: MatchingWeightsDto = { region: 1, preferences: 1, interests: 1 };
  private matchingCriteria: MatchingCriteriaDto = {};

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

  async findMatches(userData: UserDataDto[]): Promise<MatchingGroupDto[]> {
    const users = await this.userRepository.find({
      where: userData.map(u => ({ region: u.region, preferences: u.preferences, interests: u.interests })),
    });
    return this.groupUsers(users);
  }

  async getUserData(userIds?: number[]): Promise<UserDataDto[]> {
    let users: User[];
    if (userIds) {
      users = await this.userRepository.findByIds(userIds);
    } else {
      users = await this.userRepository.find();
    }

    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      region: user.region,
      preferences: user.preferences,
      interests: user.interests,
    }));
  }


  @Cron(CronExpression.EVERY_SUNDAY_AT_MIDNIGHT)
  async runMatching(): Promise<void> {
    this.logger.log('Running weekly matching...');
    const users = await this.userRepository.find();
    const groups = this.groupUsers(users);
    const notificationId = uuidv4();

    // Save the groups to the database.  Clear out old groups first.
    await this.matchingGroupRepository.clear();
    const matchingGroups = groups.map(group => {
      const matchingGroup = new MatchingGroup();
      matchingGroup.users = group.users;
      matchingGroup.groupId = group.groupId;
      return matchingGroup;
    });

    await this.matchingGroupRepository.save(matchingGroups);
    this.logger.log('Matching completed and saved.');
  }

  async storeMatchingResults(results: MatchingResultsDto): Promise<void> {
    await this.matchingGroupRepository.clear(); // Clear existing groups
    const matchingGroups = results.groups.map(group => {
      const matchingGroup = new MatchingGroup();
      matchingGroup.users = group.users;
      matchingGroup.groupId = group.groupId;
      return matchingGroup;
    });
    await this.matchingGroupRepository.save(matchingGroups);
  }



  async retrieveMatchingResults(userId?: number): Promise<MatchingResultsDto> {
    this.logger.log('Retrieving matching results...');
    let groups = await this.matchingGroupRepository.find({ relations: ['users'] });

    if (userId) {
      groups = groups.filter(group => group.users.some(user => user.id === userId));
    }

    // Apply matching criteria filtering
    if (this.matchingCriteria) {
      groups = groups.filter(group => this.filterGroup(group, this.matchingCriteria));
    }


    return {
      groups: groups.map(group => ({ groupId: group.groupId, users: group.users })),
      notificationId: undefined, // You might want to generate a notification ID here if applicable.
    };
  }

  async updateMatch(matchId: string, updates: Partial<MatchingGroupDto>): Promise<MatchingGroupDto> {
    const match = await this.matchingGroupRepository.findOne({ where: { groupId: matchId }, relations: ['users'] });
    if (!match) {
      throw new Error(`Match with ID ${matchId} not found.`);
    }

    Object.assign(match, updates);
    await this.matchingGroupRepository.save(match);
    return { groupId: match.groupId, users: match.users };
  }


  updateMatchingWeights(weights: MatchingWeightsDto) {
    this.matchingWeights = weights;
  }

  updateMatchingCriteria(criteria: MatchingCriteriaDto) {
    this.matchingCriteria = criteria;
  }


  private groupUsers(users: User[]): MatchingGroupDto[] {
    const start = Date.now();
    const groups: MatchingGroupDto[] = [];
    const groupSize = this.matchingCriteria.groupSize || 5;


    // Sort users based on weighted factors and criteria
    users.sort((a, b) => this.compareUsers(a, b));

    for (let i = 0; i < users.length; i += groupSize) {
      const groupUsers = users.slice(i, i + groupSize);
      groups.push({ groupId: uuidv4(), users: groupUsers });
    }

    const end = Date.now();
    this.logger.log(`groupUsers took ${end - start}ms for ${users.length} users`);
    return groups;
  }

  async runPerformanceTests(): Promise<void> {
      const userCounts = [10, 100, 1000, 5000, 10000];
      const results = [];

      for (const userCount of userCounts) {
          const users = await this.userRepository.find({ take: userCount });
          const start = Date.now();
          this.groupUsers(users);
          const end = Date.now();
          results.push({ userCount, time: end - start });
          this.logger.log(`Performance test for ${userCount} users took ${end - start}ms`);
      }

      try {
        writeFileSync('performance-results.json', JSON.stringify(results, null, 2));
        this.logger.log('Performance test results written to performance-results.json');
      } catch (error) {
        this.logger.error(`Failed to write performance test results: ${error}`);
      }
  }


  private compareUsers(a: User, b: User): number {
    let scoreA = 0;
    let scoreB = 0;

    if (a.region && b.region) {
      scoreA += (a.region === b.region ? 1 : 0) * this.matchingWeights.region;
      scoreB += (a.region === b.region ? 1 : 0) * this.matchingWeights.region;
    }
    a.preferences?.forEach(pref => b.preferences?.includes(pref) && (scoreA += this.matchingWeights.preferences));
    b.preferences?.forEach(pref => a.preferences?.includes(pref) && (scoreB += this.matchingWeights.preferences));
    a.interests?.forEach(interest => b.interests?.includes(interest) && (scoreA += this.matchingWeights.interests));
    b.interests?.forEach(interest => a.interests?.includes(interest) && (scoreB += this.matchingWeights.interests));

    return scoreB - scoreA; // Sort descending
  }


  private filterGroup(group: MatchingGroup, criteria: MatchingCriteriaDto): boolean {
    return group.users.every(user => {
      if (criteria.region && user.region !== criteria.region) return false;
      if (criteria.preferences && !criteria.preferences.every(pref => user.preferences?.includes(pref))) return false;
      if (criteria.interests && !criteria.interests.every(interest => user.interests?.includes(interest))) return false;
      return true;
    });
  }



  async getMatchingStatistics(): Promise<MatchingStatisticsDto> {
    const groups = await this.matchingGroupRepository.find({ relations: ['users'] });
    const totalGroups = groups.length;
    const totalUsers = groups.reduce((sum, group) => sum + group.users.length, 0);
    const averageGroupSize = totalGroups > 0 ? totalUsers / totalGroups : 0;

    return {
      totalGroups,
      averageGroupSize,
    };
  }
}
```