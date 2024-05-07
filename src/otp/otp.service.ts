import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OTP } from './entity/otp.entity';
import * as crypto from 'crypto';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
import { UsersService } from 'src/users/users.service';
import { emailBody2 } from 'src/shareEntire/utils';
import { httpErrors } from 'src/shareEntire/exception-filter/http-errors.const';

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(OTP)
        private readonly otpRepository: Repository<OTP>,
        private readonly usersService: UsersService
    ) {}

    async generateOTP(userEmail: string): Promise<any> {
        const otpCode = crypto.randomBytes(3).toString('hex'); // Generate random OTP code
        const expirationTime = new Date(Date.now() + 3 * 60 * 1000); // Set expiration time to 3 minutes
        const otp = this.otpRepository.create({ email: userEmail, code: otpCode, expirationTime });
        await this.otpRepository.save(otp);

        await this.sendOTP(otpCode, userEmail);

        return;
    }

    async sendOTP(otpCode: string, userEmail: string): Promise<any> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_APP,
                pass: process.env.PASSWORD_APP
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL_APP,
            to: 'quangnguyenngoc314@gmail.com',
            subject: 'Homestay: OTP confirmation',
            html: emailBody2(otpCode)
        };
        

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                
            } 

            console.log('Email sent: ' + info.response);
        });
    }

    async verifyOTP(userEmail: string, otp: string): Promise<any> {
        const existedOtp = await this.otpRepository.findOneBy({
            email: userEmail   
        });

        if (!existedOtp) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'invalid email',
            }, HttpStatus.FORBIDDEN);
        }

        if (existedOtp.code != otp) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'wrong otp',
            }, HttpStatus.FORBIDDEN);
        } 

        this.usersService.otpConfirmed(userEmail);

        return {status: "verify"}
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async cleanExpiredOTPs() {
        await this.otpRepository
        .createQueryBuilder()
        .delete()
        .where('expirationTime < :now', { now: new Date() })
        .execute();
    }

}
