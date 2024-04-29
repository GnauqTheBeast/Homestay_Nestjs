import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator"
import { Timestamp } from "typeorm"

export class UsersDto {
    id: number
    email: string
    fullName: string 
    password: string
    isActive: boolean
    createdAt: Timestamp
    phone: string
    role: string
}

export class EditUsersDto {
    @IsString()
    @MaxLength(50)
    @ApiProperty({
        example: "Edited Name",
    })
    fullName: string 

    @IsString()
    @ApiProperty({
        example: "Edited password",
    })
    password: string

    @IsString()
    @ApiProperty({
        example: "Edited Phone",
    })
    phone: string
}

export class changeActiveUsersDto {
    @IsBoolean()
    @ApiProperty({
        example: "false",
    })
    isActive: boolean
}