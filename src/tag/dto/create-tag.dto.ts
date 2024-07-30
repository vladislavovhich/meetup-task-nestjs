import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTagDto {
    @ApiProperty({
        example: "Node.js",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;
}