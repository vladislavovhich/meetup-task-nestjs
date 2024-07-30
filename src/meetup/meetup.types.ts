import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsInt, IsPositive, IsNotEmpty, IsISO8601, IsEnum} from "class-validator"
import { SortEnum } from "src/common/enums/enums"

export class PaginationDto {
    @ApiProperty({description: "Page number", required: false})
    @IsOptional()
    @IsPositive()
    @IsInt()
    page?: number = 1

    @ApiProperty({description: "Page size", required: false})
    @IsOptional()
    @IsPositive()
    @IsInt()
    pageSize?: number = 10
}

export class GetAllMeetupsDto extends PaginationDto {
    @ApiProperty({description: "Place order [ASC, DESC]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    placeOrder: string

    @ApiProperty({description: "Time order [ASC, DESC]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    timeOrder: string

    @ApiProperty({description: "Description order [ASC, DESC]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    descriptionOrder: string

    @ApiProperty({description: "Name order [ASC, DESC]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    nameOrder: string
}