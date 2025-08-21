```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/community.entity';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';
import { CreateCommunityDto } from '../src/community/dto/create-community.dto';
import { UpdateCommunityDto } from '../src/community/dto/update-community.dto';
import { Comment } from '../src/community/comment.entity';
import { CreateCommentDto } from '../src/community/dto/create-comment.dto';
import { UpdateCommentDto } from '../src/community/dto/update-comment.dto';
import { NotFoundException } from '@nestjs/common';

describe('CommunityService', () => {
  let service: CommunityService;
  let communityRepository: Repository<Community>;
  let userRepository: Repository<User>;
  let commentRepository: Repository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunityService,
        {
          provide: getRepositoryToken(Community),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  // ... existing tests ...

  describe('Comments', () => {
    // ... existing comment tests ...

    it('should throw NotFoundException if user is not found when creating comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const userId = 1;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.createComment(postId, createCommentDto, userId)).rejects.toThrow(NotFoundException);
    });


    it('should throw NotFoundException if community is not found when creating comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const user: User = { id: 1 } as User;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.createComment(postId, createCommentDto, user.id)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if comment is not found when finding one comment', async () => {
      const postId = 1;
      const id = 1;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOneComment(postId, id)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if comment is not found when updating comment', async () => {
      const postId = 1;
      const id = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.updateComment(postId, id, updateCommentDto)).rejects.toThrow(NotFoundException);
    });
  });
});

```