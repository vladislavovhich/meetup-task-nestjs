import { Injectable } from '@nestjs/common';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagService } from 'src/tag/tag.service';
import { connect } from 'http2';
import { Prisma } from '@prisma/client';

@Injectable()
export class MeetupService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tagService: TagService
    ) {}

    async handleTags(tags: string[], userId: number) {
        const tagsId = []

        for (let tagName of tags) {
            let tag = await this.tagService.findByName(tagName)

            if (!tag) {
              tag = await this.tagService.create({name: tagName}, userId)
            }
            
            tagsId.push(tag.id)
        }

        return tagsId
    }

    async create(createMeetupDto: CreateMeetupDto, userId: number) {
        const tagsId = await this.handleTags(createMeetupDto.tags, userId)

        return await this.prisma.meetup.create({
          data: {
            name: createMeetupDto.name,
            place: createMeetupDto.place,
            time: createMeetupDto.time,
            description: createMeetupDto.description,
            user: {connect: {id: userId}},
            tags: {
              create: tagsId.map(tagId => ({tag: { connect: {id: tagId}}}))
            }
          }
        })
    }

    async findAll() {
        return await this.prisma.meetup.findMany({
          include: {
            tags: {
              include: {
                tag: true
              }
            }
          },
        })
    }

    async findOne(id: number) {
        return await this.prisma.meetup.findFirstOrThrow({where: {id}})
    }

    async update(id: number, updateMeetupDto: UpdateMeetupDto, userId: number) {
        const tagsId = await this.handleTags(updateMeetupDto.tags, userId)

        return await this.prisma.meetup.update({
            data: {
              name: updateMeetupDto.name,
              place: updateMeetupDto.place,
              time: updateMeetupDto.time,
              description: updateMeetupDto.description,
              tags: {
                updateMany: {
                  data: [{tag: {connect: {id: 10}}}]
                }
              },
            }, 
            where: {id: id}
        })
    }

    async remove(id: number) {
        return await this.prisma.meetup.delete({
          where: {id}
        })
    }
}
