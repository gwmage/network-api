```typescript
    it('should get a comment by ID', async () => {
      const postId = 1;
      const commentId = 1;
      const comment: Comment = { id: commentId, post: { id: postId } as Community } as Comment;
      jest.spyOn(service, 'findOneComment').mockResolvedValue(comment);

      expect(await controller.findOneComment(postId, commentId)).toEqual(comment);
    });
```