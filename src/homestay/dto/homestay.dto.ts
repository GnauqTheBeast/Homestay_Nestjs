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

    @IsString()
    @ApiProperty({
        example: "https://images.unsplash.com/photo-1648995505975-8fe3ebc7b253?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    })
    images: string

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

    @IsString()
    @ApiProperty({
        example: "https://images.unsplash.com/photo-1648995505975-8fe3ebc7b253?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    })
    images: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "500",
    })
    price: number
}