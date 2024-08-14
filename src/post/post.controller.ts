import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':postId')
  findOne(@Param('postId') postId: string) {
    return this.postService.findOne(postId);
  }

  @Patch(':postId')
  update(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(postId, updatePostDto);
  }

  @Delete(':postId')
  remove(@Param('postId') postId: string) {
    return this.postService.remove(postId);
  }
}
