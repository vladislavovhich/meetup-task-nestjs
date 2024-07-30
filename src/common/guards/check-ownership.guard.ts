import {CanActivate, ExecutionContext, ForbiddenException, Injectable,  UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/auth/auth.types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UserRole } from '../enums/enums';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
        private readonly reflector: Reflector,
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const usr: UserType = request.user;
        const resourceId = request.params.id;
        const resourceType = this.reflector.get<string>('resourceType', context.getHandler());

        if (!resourceType) {
            throw new UnauthorizedException('Resource type is not specified');
        }

        const resource = await this.prisma[resourceType].findUnique({
            where: { id: Number(resourceId) },
        });

        const user = await this.userService.findOne(usr.userId)

        if (user.role == UserRole.ADMIN) {
            return true
        } else if (!resource || resource.userId !== usr.userId) {
            throw new ForbiddenException('Access denied');
        }

        return true;
    }
}