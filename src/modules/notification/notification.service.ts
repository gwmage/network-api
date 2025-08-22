```typescript
import { Injectable } from '@nestjs/common';
import { Comment } from '../community/comment.entity';
import { Community } from '../community/community.entity';
import { User } from '../user/user.entity';
// ... other imports

@Injectable()
export class NotificationService {
  // ... existing code ...

  async createCommentNotification(comment: Comment): Promise<Notification> {
    const message = `New comment on post ${comment.post.id}: ${comment.content}`;
    return this.createNotification(comment.user.id, message, 'comment', { postId: comment.post.id, commentId: comment.id });
  }

  async updateCommentNotification(comment: Comment): Promise<Notification> {
    const message = `Comment updated on post ${comment.post.id}: ${comment.content}`;
    return this.createNotification(comment.user.id, message, 'comment', { postId: comment.post.id, commentId: comment.id });
  }

  async deleteCommentNotification(comment: Comment): Promise<void> {
    const message = `Comment deleted on post ${comment.post.id}`;
    return this.createNotification(comment.user.id, message, 'comment', { postId: comment.post.id });
  }


  // ... existing code ... including createNotification, sendCommentNotification, etc.

}

```