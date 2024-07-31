import { Prisma, Meetup } from "@prisma/client"

export class GetAllMeetupsType {
    nextPage?: number
    prevPage?: number
    meetups: Meetup[]
}