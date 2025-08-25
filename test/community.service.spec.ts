```typescript
import { PageDto } from '../src/common/dtos/page.dto';
import { PageMetaDto } from '../src/common/dtos/page-meta.dto';
import { NotFoundException } from '@nestjs/common';


describe('CommunityService', () => {
  // ... existing code ...

  describe('createComment', () => {
    it('should create a comment', async () => {
      const postId = 1;
      const userId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const createdComment = { id: 1, ...createCommentDto, community: { id: postId }, user: { id: userId } } as Comment;

      jest.spyOn(communityRepository, 'findOne').mockResolvedValue({ id: postId } as Community);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({ id: userId } as User);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment);

      const result = await service.createComment(postId, createCommentDto, userId);
      expect(result).toEqual(createdComment);
    });

    it('should throw NotFoundException if community post is not found', async () => {
      const postId = 999;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const userId = 1;

      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.createComment(postId, createCommentDto, userId)).rejects.toThrow(NotFoundException);

    });
  });


  describe('updateComment', () => {
    it('should update a comment', async () => {
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      const updatedComment = { id: commentId, ...updateCommentDto } as Comment;

      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(updatedComment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(updatedComment);

      const result = await service.updateComment(commentId, updateCommentDto);
      expect(result).toEqual(updatedComment);
    });

    it('should throw NotFoundException if comment is not found', async () => {
      const commentId = 999;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };

      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.updateComment(commentId, updateCommentDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      const commentId = 1;
      jest.spyOn(commentRepository, 'delete').mockResolvedValue({ affected: 1 });

      await service.deleteComment(commentId);
      expect(commentRepository.delete).toHaveBeenCalledWith(commentId);
    });
  });
});

```