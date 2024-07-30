import { UserRole } from "src/common/enums/enums";
import { LoginUserDto } from "./login-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum  } from "class-validator";

export class RegisterUserDto extends LoginUserDto {
    @ApiProperty({
        example: UserRole.STUDENT,
        required: false,
        default: UserRole.STUDENT,
    })
    @IsEnum(UserRole)
    role?: UserRole
}