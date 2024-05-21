import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class PaymentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "vip-hotel",
        required : true
    })
    slug: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 123,
        required : true
    })
    orderCode: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Vip Hotel",
        required : true
    })
    homestayName: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 1,
        required : true
    })
    numPeople: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 100,
        required : true
    })
    price: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 3,
        required : true
    })
    numDay: number
}