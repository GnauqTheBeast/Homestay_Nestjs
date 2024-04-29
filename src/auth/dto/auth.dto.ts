import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { UserRole } from "src/users/entity/users.entity"

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "tranthuha@gmail.com",
    })
    email: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "quangnguyen",
    })
    password: string
}

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "tranthuha@gmail.com",
        required : true
    })
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "quangnguyen",
        required : true
    })
    fullName: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "quangnguyen",
        required : true
    })
    password: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "quangdeptraiso1VN",
        required : true
    })
    passwordConfirmation: string 

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "0123456789",
        required : true
    })
    phone: string

    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole
}

export class RefreshTokenDto {
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}
  