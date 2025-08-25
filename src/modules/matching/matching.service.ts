```typescript
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Profile } from '../profile/profile.entity';
import { Group } from '../group/group.entity';
import { Repository } from 'typeorm';
import { Match } from './match.entity';

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
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  // ... (Existing findMatches method)

  async createMatch(users: User[]): Promise<Match> {
    const match = new Match();
    match.users = users;
    return this.matchRepository.save(match);
  }

  async getAllMatches(): Promise<Match[]> {
    return this.matchRepository.find({ relations: ['users'] });
  }

  async getMatchById(id: number): Promise<Match> {
    return this.matchRepository.findOne({ where: { id }, relations: ['users'] });
  }

  async updateMatch(id: number, users: User[]): Promise<Match> {
    const match = await this.getMatchById(id);
    if (!match) {
      throw new Error(`Match with ID ${id} not found`);
    }
    match.users = users;
    return this.matchRepository.save(match);
  }

  async deleteMatch(id: number): Promise<void> {
    const match = await this.getMatchById(id);
    if (!match) {
      throw new Error(`Match with ID ${id} not found`);
    }
    await this.matchRepository.remove(match);
  }
}

```