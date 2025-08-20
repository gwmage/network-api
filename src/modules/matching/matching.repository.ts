```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { GroupAssignment } from './entities/group-assignment.entity';

@Injectable()
export class MatchingRepository extends Repository<GroupAssignment> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(GroupAssignment)
    private groupAssignmentRepository: Repository<GroupAssignment>,
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
}
```