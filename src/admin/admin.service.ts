import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { UserRole, Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";
import { UsersDto, changeActiveUsersDto } from 'src/users/dto/users.dto';
import { generateToken } from 'src/shareEntire/utils';

@Injectable()
export class AdminService {
    constructor(private usersService: UsersService) {}

    async loginAdmin(loginDto: LoginDto): Promise<any> {
        const userEmail = loginDto.email;
        const existedUser = await this.usersService.findOneByEmail(userEmail);
        // user existed
        if (!existedUser) {
            throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'This email did not exist',
            }, HttpStatus.FORBIDDEN);
        }
        // check if admin 
        if (existedUser.role != "admin") {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Not Permission',
            }, HttpStatus.FORBIDDEN);
        }
        // password
        const loginResult = await bcrypt.compareSync(loginDto.password, existedUser.password);
        if (!loginResult) {
            throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Wrong password',
            }, HttpStatus.FORBIDDEN);
        }

        //generate access_token and refresh_token
        const userId = existedUser.id;
        const userRole = existedUser.role;
        const payload = {id: userId, userEmail: userEmail, role: userRole};
        const expired_at = Date.now() + (+process.env.ACCESS_TOKEN_EXPIRE_IN_SEC * 1000);

        const access_token = generateToken(payload, {
        // expiresIn: Number(this.configService.get('api.accessTokenExpireInSec')),
        expiresIn: (+process.env.ACCESS_TOKEN_EXPIRE_IN_SEC * 1000),
        });
        const refresh_token = generateToken(payload, {
        // expiresIn: Number(this.configService.get('api.refreshTokenExpireInSec')),
        expiresIn: (+process.env.REFRESH_TOKEN_EXPIRE_IN_SEC * 1000),
        });

        return { expired_at, access_token, refresh_token, existedUser };
    }

    async getAll(): Promise<Users[]> {
        const users = await this.usersService.getAll();
        return users;
    }

    async createSpecialUsers(registerDto: RegisterDto, role: UserRole): Promise<Users> {
        return this.usersService.createUser(registerDto, role);
    }

    async changeActiveUsers(changeActiveUsers: changeActiveUsersDto, id: number): Promise<Users> {
        return this.usersService.changeActiveUsers(changeActiveUsers, id);
    }
}
