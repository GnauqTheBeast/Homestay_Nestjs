import {
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor, Post, Req, BadRequestException,
    UseGuards,
  } from '@nestjs/common';
import SmsService from './sms.service';
import { verifyJWT } from 'src/shareEntire/utils';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

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

        if (resp.userIsPhoneConfirmed) {
            throw new BadRequestException('Phone number already confirmed');
        }
        
        this.smsService.initiatePhoneNumberVerification(resp.userPhone);
    }
}