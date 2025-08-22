```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/community.entity';
import { Repository } from 'typeorm';
import { Comment } from '../src/community/comment.entity';
import { NotFoundException } from '@nestjs/common';

describe('CommunityService', () => {
  let service: CommunityService;
  let communityRepository: Repository<Community>;
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
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a comment', async () => {
    const postId = 1;
    const createCommentDto = { content: 'Test comment' };
    const createdComment = { id: 1, ...createCommentDto, postId }; // Include postId
    jest.spyOn(commentRepository, 'create').mockReturnValue(createdComment);
    jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment);

    const result = await service.createComment(postId, createCommentDto);
    expect(result).toEqual(createdComment);
    expect(commentRepository.create).toHaveBeenCalledWith({ ...createCommentDto, post: { id: postId } });
  });

  it('should update a comment', async () => {
    const postId = 1;
    const id = 1;
    const updateCommentDto = { content: 'Updated comment' };
    const updatedComment = { id, ...updateCommentDto, postId };
    jest.spyOn(commentRepository, 'findOne').mockResolvedValue(updatedComment);
    jest.spyOn(commentRepository, 'save').mockResolvedValue(updatedComment);

    const result = await service.updateComment(postId, id, updateCommentDto);
    expect(result).toEqual(updatedComment);
  });

  it('should throw NotFoundException if comment is not found when updating comment', async () => {
    const postId = 1;
    const id = 1;
    const updateCommentDto = { content: 'Updated comment' };
    jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.updateComment(postId, id, updateCommentDto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a comment', async () => {
    const postId = 1;
    const id = 1;
    jest.spyOn(commentRepository, 'delete').mockResolvedValue({ affected: 1 });
    jest.spyOn(commentRepository, 'findOne').mockResolvedValue({ id, postId });

    await expect(service.removeComment(postId, id)).resolves.not.toThrow();
  });

  it('should throw NotFoundException if comment is not found when deleting comment', async () => {
    const postId = 1;
    const id = 1;
    jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.removeComment(postId, id)).rejects.toThrow(NotFoundException);
  });
});
```