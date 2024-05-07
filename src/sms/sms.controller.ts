import {
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor, Post, Req, BadRequestException,
    UseGuards,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import SmsService from './sms.service';
import { verifyJWT } from 'src/shareEntire/utils';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { httpErrors } from 'src/shareEntire/exception-filter/http-errors.const';

@ApiTags('sms')
@Controller('sms')
@UseInterceptors(ClassSerializerInterceptor)
export default class SmsController {
    constructor(
      private readonly smsService: SmsService
    ) {}
    
    @Post('initiate-verification')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async initiatePhoneNumberVerification(@Req() req: Request): Promise<any> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        const resp = await verifyJWT(access_token);

        if (resp.status === "active") {
          throw new HttpException(httpErrors.USER_CONFIRMED, HttpStatus.FORBIDDEN);
        }
        
        this.smsService.initiatePhoneNumberVerification(resp.userPhone);
    }
}