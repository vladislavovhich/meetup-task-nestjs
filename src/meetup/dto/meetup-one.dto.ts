import { ApiProperty } from "@nestjs/swagger"
import { Meetup } from "@prisma/client"

export class MeetupOneDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    place: string

    @ApiProperty()
    time: string

    @ApiProperty()
    tags: string[]

    constructor(meetup: any) {
        this.id = meetup.id
        this.description = meetup.description
        this.name = meetup.name
        this.tags = meetup.tags
        this.place = meetup.place
        this.time = meetup.time
    }
}