import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator"

export class CreateBookingDto {
    @IsDateString()
    @ApiProperty({
        required: true,
        example: "2024-05-10",
    })
    checkIn: Date

    @IsDateString()
    @ApiProperty({
        required: true,
        example: "2024-05-20",
    })
    checkOut: Date

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "500",
    })
    price: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 1,
    })
    numPeople: number
}