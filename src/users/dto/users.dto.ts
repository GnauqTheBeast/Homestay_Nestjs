import { Timestamp } from "typeorm"

export class UsersDto {
    id: number
    email: string
    fullName: string 
    password: string
    isActive: boolean
    createdAt: Timestamp
    role: string
}