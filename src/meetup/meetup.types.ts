import { Prisma, Meetup, Tag } from "@prisma/client"

export class GetAllMeetupsType {
    nextPage?: number
    prevPage?: number
    currentPage: number
    meetups: any[]
}