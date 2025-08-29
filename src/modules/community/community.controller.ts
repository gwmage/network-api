```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // Posts
  @Post('posts')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.communityService.createPost(createPostDto);
  }

  @Get('posts')
  findAllPosts(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10,
    @Query('category') category?: string,
    @Query('tags') tags?: string[],
  ) {
    return this.communityService.findAllPosts(page, limit, category, tags);
  }

  @Get('posts/:id')
  findOnePost(@Param('id', ParseIntPipe) id: number) {
    return this.communityService.findOnePost(id);
  }

  @Put('posts/:id')
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.communityService.updatePost(id, updatePostDto);
  }

  @Delete('posts/:id')
  removePost(@Param('id', ParseIntPipe) id: number) {
    return this.communityService.removePost(id);
  }

  // Comments
  @Post('posts/:postId/comments')
  createComment(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.communityService.createComment(postId, createCommentDto);
  }

  @Get('posts/:postId/comments')
  findAllComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.communityService.findAllComments(postId);
  }

  @Get('posts/:postId/comments/:id')
  findOneComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number) {
    return this.communityService.findOneComment(postId, id);
  }

  @Put('posts/:postId/comments/:id')
  updateComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.communityService.updateComment(postId, id, updateCommentDto);
  }

  @Delete('posts/:postId/comments/:id')
  removeComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number) {
    return this.communityService.removeComment(postId, id);
  }

  // Categories
  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.communityService.createCategory(createCategoryDto);
  }

  @Get('categories')
  findAllCategories() {
    return this.communityService.findAllCategories();
  }

  @Put('categories/:id')
  updateCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.communityService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.communityService.removeCategory(id);
  }

  // Tags
  @Post('tags')
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.communityService.createTag(createTagDto);
  }

  @Get('tags')
  findAllTags() {
    return this.communityService.findAllTags();
  }

  @Put('tags/:id')
  updateTag(@Param('id', ParseIntPipe) id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.communityService.updateTag(id, updateTagDto);
  }

  @Delete('tags/:id')
  removeTag(@Param('id', ParseIntPipe) id: number) {
    return this.communityService.removeTag(id);
  }
}

```