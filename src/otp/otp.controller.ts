import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OtpService } from './otp.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { verifyJWT } from 'src/shareEntire/utils';
import { OtpDto } from './dto/otp.dto';
import { httpErrors } from 'src/shareEntire/exception-filter/http-errors.const';

@Controller('otp')
@ApiTags('otp')
export class OtpController {
    constructor(
        private readonly otpService: OtpService
    ) {}

    @Get('send-otp')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async sendOtp(@Req() req: Request): Promise<any> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        const resp = await verifyJWT(access_token);
        const userEmail = resp.userEmail;

        if (resp.status === "active") {
            throw new HttpException(httpErrors.USER_CONFIRMED, HttpStatus.FORBIDDEN);
        }

        return this.otpService.generateOTP(userEmail);
    }

    @Post('confirm-otp')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async verifyOtp(@Req() req: Request, @Body() otpDto: OtpDto): Promise<any> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        const resp = await verifyJWT(access_token);
        const userEmail =  resp.userEmail; 

        return this.otpService.verifyOTP(userEmail, otpDto.otp);
    }
}
