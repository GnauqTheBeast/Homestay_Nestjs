import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateHomestayDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "Vip Hotel",
    })
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "Khanh Lai - Tay Do - Hung Ha - Thai Binh",
    })
    address: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "500",
    })
    price: number
}

export class EditHomestayDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "Vip Hotel",
    })
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "Khanh Lai - Tay Do - Hung Ha - Thai Binh",
    })
    address: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "500",
    })
    price: number
}