import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, MinLength, IsString, IsAlphanumeric, MaxLength, IsISO8601 } from 'class-validator';
import { GetAllMeetupsType } from '../meetup.types';
import { MeetupOneDto } from './meetup-one.dto';

export class MeetupResponseDto {
    @ApiProperty({type: [MeetupOneDto]})
    items: MeetupOneDto[]

    @ApiProperty()
    currentPage: number

    @ApiProperty()
    nextPage?: number

    @ApiProperty()
    prevPage?: number

    constructor(result: GetAllMeetupsType) {
        this.items = result.meetups.map(meetup => new MeetupOneDto({...meetup, tags: meetup.tags.map(tag => tag.tag.name)}))
        this.currentPage = result.currentPage
        this.nextPage = result.nextPage
        this.prevPage = result.prevPage
    }
}