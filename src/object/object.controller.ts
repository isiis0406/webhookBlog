import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Object')
@Controller('objects')
export class ObjectController {
  constructor(private readonly objectService: ObjectService) {}

  @Post()
  create(@Body() createObjectDto: CreateObjectDto) {
    return this.objectService.create(createObjectDto);
  }

  @Get()
  findAll() {
    return this.objectService.findAll();
  }

  @Get(':objectId')
  findOne(@Param('objectId') objectId: string) {
    return this.objectService.findOne(objectId);
  }

  @Patch(':objectId')
  update(@Param('objectId') objectId: string, @Body() updateObjectDto: UpdateObjectDto) {
    return this.objectService.update(objectId, updateObjectDto);
  }

  @Delete(':objectId')
  remove(@Param('objectId') objectId: string) {
    return this.objectService.remove(objectId);
  }
}
