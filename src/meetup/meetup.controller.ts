import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Roles } from 'src/common/decorators/check-role.decorator';
import { UserRole } from 'src/common/enums/enums';
import { RolesGuard } from 'src/common/guards/check-role.guard';
import { CheckOwnership } from 'src/common/decorators/check-ownership.decorator';
import { OwnershipGuard } from 'src/common/guards/check-ownership.guard';
import { GetUser } from 'src/common/decorators/extract-user.decorator';
import { UserType } from 'src/auth/auth.types';
import { GetAllMeetupsDto } from './dto/get-all-meetups.dto';
import { MeetupResponseDto } from './dto/meetup-response.dto';
import { MeetupOneDto } from './dto/meetup-one.dto';

@ApiTags('Meetup')
@Controller('meetups')
export class MeetupController {
    constructor(private readonly meetupService: MeetupService) {}


    @Post('subscribe/:id')

    @ApiOkResponse({description: "You've subscribed to meetup"})
    @ApiNotFoundResponse({description: "Item not found"})
    @ApiBadRequestResponse({description: "Incorrect input data | You have subscrbied to the meetup already"})
    @ApiUnauthorizedResponse({description: "Unauthorized user can't unsubscribe to meetup"})

    @UseGuards(AccessTokenGuard)
    subscribe(@Param('id') id: string, @GetUser() user: UserType) {
        return this.meetupService.subcribe(user.userId, +id)
    }


    @Delete('unsubscribe/:id')

    @ApiOkResponse({description: "You've unsubscribed to meetup"})
    @ApiNotFoundResponse({description: "Item not found"})
    @ApiBadRequestResponse({description: "Incorrect input data | You have unsubscrbied to the meetup already"})
    @ApiUnauthorizedResponse({description: "Unauthorized user can't unsubscribe to meetup"})

    @UseGuards(AccessTokenGuard)
    unsubscribe(@Param('id') id: string, @GetUser() user: UserType) {
        return this.meetupService.unsubcribe(user.userId, +id)
    }


    @Post()

    @ApiCreatedResponse({type: MeetupOneDto})
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiUnauthorizedResponse({description: "Only mentor can create a meetup"})

    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)

    async create(@Body() createMeetupDto: CreateMeetupDto, @GetUser() user: UserType) {
        const meetup = await this.meetupService.create(createMeetupDto, user.userId);

        return new MeetupOneDto(meetup)
    }


    @ApiOkResponse({type: MeetupResponseDto})
    @ApiBadRequestResponse({description: "Incorrect input data"})

    @Get()

    findAll(@Query() getAllMeetupsDto: GetAllMeetupsDto) {
        return this.meetupService.findAll(getAllMeetupsDto);
    }


    @Get(':id')

    @ApiOkResponse({type: MeetupOneDto})
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiNotFoundResponse({description: "Item not found"})

    async findOne(@Param('id') id: string) {
        const meetup = await this.meetupService.findOne(+id);

        return new MeetupOneDto(meetup)
    }


    @Patch(':id')

    @ApiOkResponse({description: "Meetup succesfully updated"})
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiNotFoundResponse({description: "Item not found"})
    @ApiForbiddenResponse({description: "Only owner can edit this meetup"})

    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @CheckOwnership('meetup')
    @UseGuards(OwnershipGuard)
    @UseGuards(AccessTokenGuard)

    async update(@Param('id') id: string, @Body() updateMeetupDto: UpdateMeetupDto, @GetUser() user: UserType) {
        const meetup = await this.meetupService.update(+id, updateMeetupDto, user.userId);

        return new MeetupOneDto(meetup)
    }


    @Delete(':id')

    @ApiOkResponse({type: MeetupOneDto})
    @ApiBadRequestResponse({description: "Incorrect input data"})
    @ApiNotFoundResponse({description: "Item not found"})
    @ApiForbiddenResponse({description: "Only owner can delete this meetup"})

    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @UseGuards(RolesGuard)
    @CheckOwnership('meetup')
    @UseGuards(OwnershipGuard)
    @UseGuards(AccessTokenGuard)

    remove(@Param('id') id: string) {
        return this.meetupService.remove(+id);
    }
}
