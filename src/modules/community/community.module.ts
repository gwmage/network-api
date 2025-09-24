import { Module } from '@nestjs/common';
console.log('__dirname:', __dirname);
console.log('Expected relative path to tag.entity:', './entities/tag.entity');
import { TagEntity } from './entities/tag.entity';

// ... rest of the file