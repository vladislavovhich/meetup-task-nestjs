import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, MinLength, IsString, IsAlphanumeric, MaxLength, IsISO8601 } from 'class-validator';

export class CreateMeetupDto {
    @ApiProperty({
        example: "Vue.js meetup for juniors",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    name: string

    @ApiProperty({
        example: "We'are going to show you how to use Vue.js",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    description: string

    @ApiProperty({
        example: "Minsk",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    place: string

    @ApiProperty({
        example: new Date(),
        required: true
    })
    @IsNotEmpty()
    @IsISO8601()
    time: Date

    @ApiProperty({
        example: ['Vue.js', 'React.js'],
        required: true
    })
    @IsArray()
    @IsString({ each: true })
    tags: string[]
}
