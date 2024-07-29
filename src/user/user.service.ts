import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const isExist = await this.findByEmail(createUserDto.email)

    if (isExist) {
      throw new BadRequestException("Email is already taken!")
    }

    const password = await bcrypt.hash(createUserDto.password, 10)
    const user = await this.prisma.user.create({
      data: {...createUserDto, password}
    })

    return user
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.user.findFirst({
      where: {id}
    })
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    if (updateUserDto.password) {
      const password = await bcrypt.hash(updateUserDto.password as string, 10)

      updateUserDto.password = password
    }

    const user = await this.prisma.user.update({
      data: updateUserDto, where: {id}
    })

    return user
  }

  async remove(id: number) {
    return await this.prisma.user.delete({where: {id}})
  }
}
