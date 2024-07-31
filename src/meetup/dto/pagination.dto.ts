import { IsString, IsOptional, IsInt, IsPositive, IsNotEmpty, IsISO8601, IsEnum, IsNumber, IsNumberString, Min} from "class-validator"
import { ApiProperty, PartialType } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class PaginationDto {
    @ApiProperty({description: "Page number", required: false, default: 1})
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1

    @ApiProperty({description: "Page size", required: false, default: 10})
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    pageSize?: number = 10
}