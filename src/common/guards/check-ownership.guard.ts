import {CanActivate, ExecutionContext, ForbiddenException, Injectable,  UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
        private readonly reflector: Reflector,
        private readonly prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const resourceId = request.params.id;
        const resourceType = this.reflector.get<string>('resourceType', context.getHandler());

        if (!resourceType) {
            throw new UnauthorizedException('Resource type is not specified');
        }

        const resource = await this.prisma[resourceType].findUnique({
            where: { id: Number(resourceId) },
        });

        if (!resource || resource.userId !== user.userId) {
            throw new ForbiddenException('Access denied');
        }

        return true;
    }
}