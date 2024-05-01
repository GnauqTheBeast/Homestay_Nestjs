import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
 
@Injectable()
export default class SmsService {
  constructor(
    private readonly configService: ConfigService,
  ) {}
 
  initiatePhoneNumberVerification(phoneNumber: string) {
    const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
    const client = require('twilio')(accountSid, authToken);

    if (phoneNumber.startsWith("0")) {
      // Replace the leading "0" with "+84"
      phoneNumber = "+84" + phoneNumber.slice(1);
  }
    client.messages
    .create({
        to:   phoneNumber,
        from: '+13343452619',
        body: 'Ahoy!',
    });
  }
}