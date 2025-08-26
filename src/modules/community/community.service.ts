```typescript
async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto, userId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id, post: { id: postId } }, relations: ['author'] });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Authorization check: Only the author can update the comment
    if (comment.author.id !== userId) {
      throw new NotFoundException('Unauthorized to update this comment'); // Or use ForbiddenException
    }

    // Update the comment
    Object.assign(comment, updateCommentDto);
    return await this.commentRepository.save(comment);
  }

  async removeComment(postId: number, id: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id, post: { id: postId } }, relations: ['author'] });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Authorization check: Only the author can delete the comment
    if (comment.author.id !== userId) {
      throw new NotFoundException('Unauthorized to delete this comment'); // Or use ForbiddenException
    }

    await this.commentRepository.remove(comment);
  }
```