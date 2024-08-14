import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':eventId')
  findOne(@Param('eventId') eventId: string) {
    return this.eventService.findOne(eventId);
  }

  @Patch(':eventId')
  update(@Param('eventId') eventId: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(eventId, updateEventDto);
  }

  @Delete(':eventId')
  remove(@Param('eventId') eventId: string) {
    return this.eventService.remove(eventId);
  }
}
