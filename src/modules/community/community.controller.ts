import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // ... other controller methods
}