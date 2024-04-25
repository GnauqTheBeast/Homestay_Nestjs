import { ApiProperty } from "@nestjs/swagger"
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
    @ApiProperty({
        example: "Edited Name",
    })
    fullName: string 

    @ApiProperty({
        example: "Edited password",
    })
    password: string

    @ApiProperty({
        example: "Edited Phone",
    })
    phone: string
}