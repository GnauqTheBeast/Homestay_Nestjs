import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BookingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "15-5-2024",
    })
    checkIn: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "17-5-2024",
    })
    checkOut: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "500",
    })
    price: number
}