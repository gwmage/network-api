```typescript
async getComment(postId: number, id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id, post: { id: postId } }, relations: ['user', 'parentComment'] });
    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }
    return comment;
  }
```