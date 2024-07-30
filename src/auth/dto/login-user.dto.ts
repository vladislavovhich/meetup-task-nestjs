import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsString, IsAlphanumeric, MaxLength } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        example: "example@gmail.com",
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "password",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(5)
    @MaxLength(25)
    password: string;
}