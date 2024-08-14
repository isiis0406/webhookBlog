import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEventDto: CreateEventDto) {
    //Verify that event does not exist
    const eventExists = await this.prismaService.event.findFirst({
      where: { name: createEventDto.name },
    });

    if (eventExists) {
      throw new ConflictException('Event already exists');
    }

    //Create event
    return await this.prismaService.event.create({
      data: createEventDto,
      include: { object: true },
    });

  }

  async findAll() {
    return await this.prismaService.event.findMany({
      include: { object: true },
    });
  }

  async findOne(eventId: string) {
    const event = await this.prismaService.event.findUnique({
      where: { eventId },
      include: { object: true },
    });

    if (!event) {
      throw new ConflictException('Event does not exist');
    }

    return event;
  }

  async findByName(name: string) {
    const event = await this.prismaService.event.findFirst({
      where: { name },
      include: { object: true },
    });

    if (!event) {
      throw new NotFoundException('Event does not exist');
    }

    return event;
  }

  async update(eventId: string, updateEventDto: UpdateEventDto) {
    const event = await this.prismaService.event.findUnique({
      where: { eventId },
      include: { object: true },
    });

    if (!event) {
      throw new ConflictException('Event does not exist');
    }

    return await this.prismaService.event.update({
      where: { eventId },
      data: updateEventDto,
      include: { object: true },
    });
  }

  async remove(eventId: string) {
    const event = await this.prismaService.event.findUnique({
      where: { eventId },
    });

    if (!event) {
      throw new ConflictException('Event does not exist');
    }

    return await this.prismaService.event.delete({
      where: { eventId },
    });
    
  }
}
