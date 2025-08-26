```typescript
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments') // Changed from 'community/posts/:postId/comments'
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // ... other endpoints

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.communityService.createComment(createCommentDto); // No postId here
  }

  @Get(':postId') // Changed from 'posts/:postId/comments'
  findAllComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.communityService.findAllComments(postId);
  }

  @Put(':commentId') // Changed from 'posts/:postId/comments/:id'
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number, // Changed param name
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.communityService.updateComment(commentId, updateCommentDto); // No postId here
  }

  @Delete(':commentId') // Changed from 'posts/:postId/comments/:id'
  removeComment(@Param('commentId', ParseIntPipe) commentId: number) { // Changed param name
    return this.communityService.removeComment(commentId); // No postId here
  }
}
```