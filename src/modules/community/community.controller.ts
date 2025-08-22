import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FindPostQueryDto } from './dto/find-post-query.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto'; // Import PaginationQueryDto

@Controller('community')
export class CommunityController {
  // ... your existing code ...
}