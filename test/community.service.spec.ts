```typescript
    it('should throw NotFoundException if comment is not found when deleting comment', async () => {
      const postId = 1;
      const id = 1;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.removeComment(postId, id)).rejects.toThrow(NotFoundException);
    });
```