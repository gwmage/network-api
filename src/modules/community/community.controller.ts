```typescript
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('items')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post(':itemId/comments')
  createComment(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.communityService.createComment(itemId, createCommentDto);
  }

  @Get(':itemId/comments')
  findAllComments(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.communityService.findAllComments(itemId);
  }

  @Put('comments/:commentId')
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.communityService.updateComment(commentId, updateCommentDto);
  }

  @Delete('comments/:commentId')
  removeComment(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.communityService.removeComment(commentId);
  }
}
```