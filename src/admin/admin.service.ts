import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
    constructor(private usersService: UsersService) {}

    async loginAdmin(loginDto: LoginDto): Promise<Users> {
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
        return existedUser;
    }

    async getAll(page: number): Promise<Users[]> {
        const users = await this.usersService.getAll(page);
        return users;
    }
}
