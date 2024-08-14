import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ObjectService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async create(createObjectDto: CreateObjectDto) {
    
    //Verify if the object already exists
    const object = await this.prismaService.object.findUnique({
      where: {
        name: createObjectDto.name
      }
    });
    if(object){
      throw new ConflictException('Object already exists');
    }
    //Create the object
    return await this.prismaService.object.create({
      data: createObjectDto
    });
  }

  async findAll() {
    return await this.prismaService.object.findMany();
  }

  async findOne(objectId: string) {
    const object = await this.prismaService.object.findUnique({
      where: {
        objectId: objectId
      }
    });

    if(!object){
      throw new NotFoundException('Object not found');
    }
    return object;
  }

  async update(objectId: string, updateObjectDto: UpdateObjectDto) {

    //Verify if the object exists
    const object = await this.prismaService.object.findUnique({
      where: {
        objectId: objectId
      }
    });

    if(!object){
      throw new NotFoundException('Object not found');
    }

    //Update the object
    return await this.prismaService.object.update({
      where: {
        objectId: objectId
      },
      data: updateObjectDto
    });
  }

  async remove(objectId: string) {
      
      //Verify if the object exists
      const object = await this.prismaService.object.findUnique({
        where: {
          objectId: objectId
        }
      });
  
      if(!object){
        throw new NotFoundException('Object not found');
      }
  
      //Delete the object
      return await this.prismaService.object.delete({
        where: {
          objectId: objectId
        } 
      });
  }
}
