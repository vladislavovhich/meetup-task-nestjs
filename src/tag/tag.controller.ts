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
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TagOneDto } from './dto/tag-one.dto';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()

    @ApiOkResponse({type: TagOneDto})
    @ApiForbiddenResponse({description: "Only mentor can create tags"})
    @ApiBadRequestResponse({description: "Incorrect input data"})

    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)

    async create(@Body() createTagDto: CreateTagDto, @GetUser() user: UserType) {
        const tag = await this.tagService.create(createTagDto, user.userId);

        return new TagOneDto(tag)
    }


    @Get()

    @ApiOkResponse({type: [TagOneDto]})

    async findAll() {
        const tags = await this.tagService.findAll();
        
        return tags.map(tag => new TagOneDto(tag))
    }


    @Get(':id')

    @ApiOkResponse({type: TagOneDto})
    @ApiNotFoundResponse({description: "Item not found"})
    @ApiBadRequestResponse({description: "Incorrect input data"})

    async findOne(@Param('id') id: string) {
        const tag = await this.tagService.findOne(+id)
        
        return new TagOneDto(tag)
    }


    @Patch(':id')

    @ApiOkResponse({type: TagOneDto})
    @ApiNotFoundResponse({description: "Item not found"})
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiForbiddenResponse({description: "Only mentors allowed to edit tags | Only owner can edit this tag"})

    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @CheckOwnership('tag')
    @UseGuards(OwnershipGuard)
    @UseGuards(AccessTokenGuard)

    async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto, @GetUser() user: UserType) {
        const tag = await this.tagService.update(+id, updateTagDto);

        return new TagOneDto(tag)
    }


    @Delete(':id')

    @ApiOkResponse({description: "Tag deleted"})
    @ApiNotFoundResponse({description: "Item not found"})
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiForbiddenResponse({description: "Only mentors allowed to delete tags | Only owner can delete this tag"})

    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @CheckOwnership('tag')
    @UseGuards(OwnershipGuard)
    @UseGuards(AccessTokenGuard)

    remove(@Param('id') id: string) {
        this.tagService.remove(+id);
    }
}
