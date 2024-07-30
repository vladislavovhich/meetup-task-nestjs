import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TagService } from './tag.service';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { GetUser } from 'src/common/decorators/extract-user.decorator';
import { UserType } from 'src/auth/auth.types';
import { CheckOwnership } from 'src/common/decorators/check-ownership.decorator';
import { OwnershipGuard } from 'src/common/guards/check-ownership.guard';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from 'src/tag/dto/update-tag.dto';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/check-role.decorator';
import { RolesGuard } from 'src/common/guards/check-role.guard';
import { UserRole } from 'src/common/enums/enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)
    create(@Body() createTagDto: CreateTagDto, @GetUser() user: UserType) {
        return this.tagService.create(createTagDto, user.userId);
    }

    @Get()
    findAll() {
        return this.tagService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagService.findOne(+id);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @CheckOwnership('tag')
    @UseGuards(OwnershipGuard)
    @UseGuards(AccessTokenGuard)
    update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto, @GetUser() user: UserType) {
        return this.tagService.update(+id, updateTagDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @CheckOwnership('tag')
    @UseGuards(OwnershipGuard)
    @UseGuards(AccessTokenGuard)
    remove(@Param('id') id: string) {
        return this.tagService.remove(+id);
    }
}
