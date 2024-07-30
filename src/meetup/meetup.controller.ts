import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Roles } from 'src/common/decorators/check-role.decorator';
import { UserRole } from 'src/common/enums/enums';
import { RolesGuard } from 'src/common/guards/check-role.guard';
import { CheckOwnership } from 'src/common/decorators/check-ownership.decorator';
import { OwnershipGuard } from 'src/common/guards/check-ownership.guard';
import { GetUser } from 'src/common/decorators/extract-user.decorator';
import { UserType } from 'src/auth/auth.types';
import { GetAllMeetupsDto, PaginationDto } from './meetup.types';

@ApiTags('Meetup')
@Controller('meetups')
export class MeetupController {
    constructor(private readonly meetupService: MeetupService) {}

    @Post()
    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)
    create(@Body() createMeetupDto: CreateMeetupDto, @GetUser() user: UserType) {
        return this.meetupService.create(createMeetupDto, user.userId);
    }

    @Get()
    findAll(@Query() query: GetAllMeetupsDto) {
        return this.meetupService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.meetupService.findOne(+id);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @CheckOwnership('meetup')
    @UseGuards(OwnershipGuard)
    @UseGuards(AccessTokenGuard)
    update(@Param('id') id: string, @Body() updateMeetupDto: UpdateMeetupDto) {
        return this.meetupService.update(+id, updateMeetupDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @CheckOwnership('meetup')
    @UseGuards(OwnershipGuard)
    @UseGuards(AccessTokenGuard)
    remove(@Param('id') id: string) {
        return this.meetupService.remove(+id);
    }
}
