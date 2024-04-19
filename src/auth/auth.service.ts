import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        
        return null;
    }

    async userLogin(loginDto: LoginDto) {
        const userLogin = await this.usersService.loginUser(loginDto);
        return userLogin;
    }

    async userRegister(registerDto : RegisterDto) {
        const userRegister = await this.usersService.createUser(registerDto);
        return userRegister;
    }
}
