```typescript
    it('should create a comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const user: User = { id: 1 } as User;
      const createdComment: Comment = { id: 1, content: 'Test Comment', user, community: { id: postId } as Community } as Comment;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(communityRepository, 'findOne').mockResolvedValue({ id: postId } as Community);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment);

      const result = await service.createComment(postId, createCommentDto, user.id);

      expect(result).toEqual(createdComment);
    });

    it('should find one comment', async () => {
      const postId = 1;
      const id = 1;
      const comment = { id, postId } as Comment;

      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(comment);
      const result = await service.findOneComment(postId, id);
      expect(result).toEqual(comment);
    });


    it('should update a comment', async () => {
      const postId = 1;
      const id = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      const updatedComment = { id, content: 'Updated Comment', postId } as Comment;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue({ id } as Comment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(updatedComment)

      const result = await service.updateComment(postId, id, updateCommentDto);
      expect(result).toEqual(updatedComment);

    });

    it('should remove a comment', async () => {
      const postId = 1;
      const id = 1;

      jest.spyOn(commentRepository, 'delete').mockResolvedValue({ affected: 1 });
      const result = await service.removeComment(postId, id);
      expect(result).toEqual({ affected: 1 });


    });
```