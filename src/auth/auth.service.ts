import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { generateToken, verifyRefreshJWT } from 'src/shareEntire/utils';

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

    async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<any> {
        try {
            const verifyTokenOld = await verifyRefreshJWT(refreshTokenDto.refreshToken);
            let access_token: string;
            let refresh_token: string;
            try {
                access_token = await generateToken(verifyTokenOld);
                refresh_token = await generateToken(verifyTokenOld);
                return {access_token, refresh_token};
            } catch(error) {
                throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
            }
        } catch(error) {
            throw new HttpException('refresh-token is not valid', HttpStatus.BAD_REQUEST);
        }
    }
}
