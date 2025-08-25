```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { GroupAssignment } from './entities/group-assignment.entity';
import { MatchingGroup } from './entities/matching-group.entity';
import { UserMatch } from './entities/user-match.entity';

@Injectable()
export class MatchingRepository extends Repository<GroupAssignment> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(GroupAssignment)
    private groupAssignmentRepository: Repository<GroupAssignment>,
    @InjectRepository(MatchingGroup)
    private matchingGroupRepository: Repository<MatchingGroup>,
    @InjectRepository(UserMatch)
    private userMatchRepository: Repository<UserMatch>,
  ) {
    super(
      groupAssignmentRepository.target,
      groupAssignmentRepository.manager,
      groupAssignmentRepository.queryRunner,
    );
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async saveGroupAssignments(groupAssignments: GroupAssignment[]): Promise<void> {
    await this.groupAssignmentRepository.save(groupAssignments);
  }

  async findGroupAssignmentsByUserId(userId: number): Promise<GroupAssignment[]> {
    return this.groupAssignmentRepository.find({
      where: { userId },
    });
  }

  async findGroupAssignments(where: FindOptionsWhere<GroupAssignment>): Promise<GroupAssignment[]> {
    return this.groupAssignmentRepository.find({ where });
  }

  async saveMatchingGroup(matchingGroup: MatchingGroup): Promise<void> {
    await this.matchingGroupRepository.save(matchingGroup);
  }

  async saveUserMatch(userMatch: UserMatch): Promise<void> {
    await this.userMatchRepository.save(userMatch);
  }
}

```