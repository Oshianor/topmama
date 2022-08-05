import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IpAddress } from './../common/IPAddress.decorator';

@Controller('/api/v1/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @IpAddress() ipAddress: string) {
    return this.commentsService.create(createCommentDto, ipAddress);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }
}
