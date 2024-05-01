import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return this.authService.userLogin(loginDto);
    }

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async userRegister(@Body() registerDto: RegisterDto) {
        const userRegister = await this.authService.userRegister(registerDto)
        return userRegister;
    }

    @Post('refresh-token')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto){
        const newAccessToken = await this.authService.refreshToken(refreshTokenDto);
        return {
            success: true,
            content: newAccessToken,
        };
    }
}