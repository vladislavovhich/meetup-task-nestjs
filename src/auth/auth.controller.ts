import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, Get, Req, Res } from '@nestjs/common';
import { Response, Request, response} from "express"
import { Prisma } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { UserService } from 'src/user/user.service';
import { GetUser } from 'src/common/decorators/extract-user.decorator';
import { UserType } from './auth.types';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { request } from 'http';

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('signin')
    async signIn(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) { 
        const result = await this.authService.signIn(loginUserDto)

        response.cookie("jwt", result.tokens.accessToken, {httpOnly: true, secure: true})
        response.cookie("jwt-refresh", result.tokens.refreshToken, {httpOnly: true, secure: true})

        return result
    }

    @Post('signup') 
    async signUp(@Body() createUserDto: Prisma.UserCreateInput, @Res({ passthrough: true }) response: Response) {
        const result = await this.authService.signUp(createUserDto)

        response.cookie("jwt", result.tokens.accessToken, {httpOnly: true, secure: true})
        response.cookie("jwt-refresh", result.tokens.refreshToken, {httpOnly: true, secure: true})

        return result.user
    }

    @Get('logout') 
    @UseGuards(AccessTokenGuard)
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt')
        response.clearCookie('jwt-refresh')

        response.sendStatus(200)
    }

    @Get('refresh-token')
    @UseGuards(RefreshTokenGuard)
    async refreshToken(@Req() req: Request, @GetUser() u: UserType, @Res({ passthrough: true }) response: Response) {
        const tokens = await this.authService.refreshToken(u.userId, req.cookies['jwt-refresh'])

        response.cookie("jwt", tokens.accessToken, {httpOnly: true, secure: true})
        response.cookie("jwt-refresh", tokens.refreshToken, {httpOnly: true, secure: true})

        response.sendStatus(200)
    }

    @Get('me')
    @UseGuards(AccessTokenGuard)
    async getMyProfile(@Req() req: Request, @GetUser() u: UserType) {
        const user = await this.userService.findOne(u.userId)

        return user
    }
}
