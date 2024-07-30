import { Controller, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from 'src/tag/dto/update-tag.dto';

@Injectable()
@Controller('tags')
export class TagService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createTagDto: CreateTagDto, userId: number) {
        return await this.prisma.tag.create({
          data: {
            name: createTagDto.name,
            user: {connect: {id: userId}}
          }
        })
    }

    async findAll() {
        return await this.prisma.tag.findMany()
    }

    async findByName(name: string) {
        return await this.prisma.tag.findFirst({where: {name}})
    }

    async findOne(id: number) {
        return await this.prisma.tag.findFirst({where: {id}})
    }

    async update(id: number, updateTagDto: UpdateTagDto) {
        return await this.prisma.tag.update({
          data: {
            name: updateTagDto.name
          }, 
          where: {id: id}
        })
    }

    async remove(id: number) {
        return await this.prisma.tag.delete({
          where: {id}
        })
    }
}
