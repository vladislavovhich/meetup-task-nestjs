import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagService } from 'src/tag/tag.service';
import { GetAllMeetupsDto } from './dto/get-all-meetups.dto';
import { GetAllMeetupsType } from './meetup.types';
import { transformOrderSortProps } from 'src/common/helpers/transform-order-sort-props.helper';

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

    async findAll(getAllMeetupsDto: GetAllMeetupsDto) {
        const {page, pageSize} = getAllMeetupsDto
        const offset = (page - 1) * pageSize
        const count = await this.prisma.meetup.count()
        const hasNextPage = count - page * pageSize > 0
        const hasPrevPage = page > 1 && count - (page - 1) * pageSize > 0

        const props = Object.entries(getAllMeetupsDto)
        const orderByProps = transformOrderSortProps(props, "Order")
        const filterByProps = transformOrderSortProps(props, "Filter")

        const meetups = await this.prisma.meetup.findMany({
          skip: offset,
          take: getAllMeetupsDto.pageSize,
          include: {
            tags: {
              include: {
                tag: true
              }
            }
          },
          where: filterByProps,
          orderBy: orderByProps
        })

        const result: GetAllMeetupsType = {meetups: meetups}

        if (hasNextPage) {
          result.nextPage = page + 1
        }

        if (hasPrevPage) {
          result.prevPage = page - 1
        }

        return result
    }

    async findOne(id: number) {
        return await this.prisma.meetup.findFirstOrThrow({where: {id}})
    }

    async update(id: number, updateMeetupDto: UpdateMeetupDto, userId: number) {
        const tagsId = await this.handleTags(updateMeetupDto.tags, userId)

        if (tagsId.length) {
          await this.prisma.meetupTag.deleteMany({
            where: {
              meetupId: id
            }
          })
        }

        return await this.prisma.meetup.update({
            data: {
              name: updateMeetupDto.name,
              place: updateMeetupDto.place,
              time: updateMeetupDto.time,
              description: updateMeetupDto.description,
              tags: {
                create: tagsId.map(tagId => ({tag: { connect: {id: tagId}}}))
              }
            }, 
            where: {id: id}
        })
    }

    async subcribe(userId: number, meetupId: number) {
        const isSub = await this.isSubscribed(userId, meetupId)

        if (isSub) {
          throw new BadRequestException("You've already subscribed to the meetup!")
        }

        await this.prisma.meetupSubcriber.create({data: {userId, meetupId}})
    }

    async unsubcribe(userId: number, meetupId: number) {
        const isSub = await this.isSubscribed(userId, meetupId)

        if (!isSub) {
          throw new BadRequestException("You're not subscribed to the meetup!")
        }

        await this.prisma.meetupSubcriber.deleteMany({where: {userId, meetupId}})
    }

    async isSubscribed(userId: number, meetupId: number) {
        const isSub = await this.prisma.meetupSubcriber.findFirst({where: {userId, meetupId}})

        return !!isSub
    }

    async remove(id: number) {
        return await this.prisma.meetup.delete({
          where: {id}
        })
    }
}
