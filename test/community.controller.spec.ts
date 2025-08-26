```typescript
  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      const postId = 1;
      const commentId = 1;
      jest.spyOn(service, 'deleteComment').mockResolvedValue(undefined);

      expect(await controller.deleteComment(postId, commentId)).toBeUndefined();
    });

    it('should throw NotFoundException if comment not found', async () => {
      const postId = 1;
      const commentId = 1;
      jest.spyOn(service, 'deleteComment').mockRejectedValue(new NotFoundException());

      await expect(controller.deleteComment(postId, commentId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('createComment', () => {
    it('should create a new comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'New Comment' };
      const createdComment: Comment = { id: 1, ...createCommentDto, post: { id: postId } as Community };
      jest.spyOn(service, 'createComment').mockResolvedValue(createdComment);

      expect(await controller.createComment(postId, createCommentDto)).toEqual(createdComment);
    });

    it('should throw NotFoundException if post not found', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'New Comment' };
      jest.spyOn(service, 'createComment').mockRejectedValue(new NotFoundException());

      await expect(controller.createComment(postId, createCommentDto)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('updateComment', () => {
    it('should update an existing comment', async () => {
      const postId = 1;
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      const updatedComment: Comment = { id: commentId, ...updateCommentDto, post: { id: postId } as Community };
      jest.spyOn(service, 'updateComment').mockResolvedValue(updatedComment);

      expect(await controller.updateComment(postId, commentId, updateCommentDto)).toEqual(updatedComment);
    });

    it('should throw NotFoundException if comment not found', async () => {
      const postId = 1;
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      jest.spyOn(service, 'updateComment').mockRejectedValue(new NotFoundException());

      await expect(controller.updateComment(postId, commentId, updateCommentDto)).rejects.toThrowError(NotFoundException);
    });
  });
```