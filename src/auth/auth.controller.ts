import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
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

    // signup
    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async userRegister(@Body() registerDto: RegisterDto) {
        const userRegister = await this.authService.userRegister(registerDto)
        return userRegister;
    }
}
