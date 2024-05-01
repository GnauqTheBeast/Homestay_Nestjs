import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class OtpDto {
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "abcdef",
    })
    otp: string
}