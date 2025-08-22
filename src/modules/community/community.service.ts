```typescript
async createComment(postId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post: { id: postId },
    });
    return await this.commentRepository.save(newComment);
  }

  async getComments(postId: number): Promise<Comment[]> {
    return await this.commentRepository.findBy({ post: { id: postId } });
  }

  async updateComment(postId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update({ id, post: { id: postId } }, updateCommentDto);
    return await this.commentRepository.findOneBy({ id, post: { id: postId } });
  }

  async deleteComment(postId: number, id: number): Promise<void> {
    await this.commentRepository.delete({ id, post: { id: postId } });
  }
```