import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsString, IsOptional, IsNotEmpty, IsEnum, IsISO8601} from "class-validator"
import { SortEnum } from "src/common/enums/enums"
import { PaginationDto } from "./pagination.dto"

export class GetAllMeetupsDto extends PaginationDto {
    @ApiProperty({description: "Place order [asc, desc]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    placeOrder: string

    @ApiProperty({description: "Time order [asc, desc]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    timeOrder: string

    @ApiProperty({description: "Description order [asc, desc]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    descriptionOrder: string

    @ApiProperty({description: "Name order [asc, desc]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    nameOrder: string

    @ApiProperty({description: "Place filter", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    placeFilter: string

    @ApiProperty({description: "Time filter", required: false, default: new Date()})
    @IsOptional()
    @IsNotEmpty()
    @IsISO8601()
    timeFilter: Date

    @ApiProperty({description: "Description filter", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descriptionFilter: string

    @ApiProperty({description: "Name filter", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    nameFilter: string
}