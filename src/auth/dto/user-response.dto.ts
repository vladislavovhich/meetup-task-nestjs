import { UserRole } from "src/common/enums/enums";
import { LoginUserDto } from "./login-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum  } from "class-validator";
import { Prisma, User } from "@prisma/client";

export class UserResponseDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    email: string
    
    @ApiProperty({ example: UserRole.STUDENT })
    @IsEnum(UserRole)
    role?: string

    constructor(user: User) {
        this.id = user.id
        this.email = user.email
        this.role = user.role
    }
}