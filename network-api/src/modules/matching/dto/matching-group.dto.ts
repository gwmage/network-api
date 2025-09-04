import { UserDataDto } from './user-data.dto';
import { User } from '../../auth/entities/user.entity';

export class MatchingGroupDto {
  groupId: string;
  users: User[];
}