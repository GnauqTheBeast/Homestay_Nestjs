import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from "bcrypt"
import { httpErrors } from 'src/shareEntire/exception-filter/http-errors.const';
import { generateToken, verifyJWT } from 'src/shareEntire/utils';
import { ConfigService } from '@nestjs/config';
import { UserRole } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly configService: ConfigService
  ) {}

  async getAll(page: number): Promise<Users[]> {
    if(page < 1) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Not found',
      }, HttpStatus.FORBIDDEN);
    }
    const [users, userNum] = await this.usersRepository.findAndCount({
      skip: 5 * (page - 1),
      take: 5,
    });

    const maxPage = Math.ceil(userNum / 5)
    if(page > maxPage) {
      throw new HttpException(httpErrors.PAGE_NOT_EXIST, HttpStatus.FORBIDDEN);
    }

    return users;
  }

  async findOneByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({
      email: email
    });
    return user; 
  }

  async getOneById(access_token: string): Promise<Users> {
    const resp = await verifyJWT(access_token)
    const id = resp.id;
    try {
      const user = await this.usersRepository.findOneBy({
        id: id
      })
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(registerDto: RegisterDto, role: UserRole = UserRole.CUSTOMER): Promise<Users> {
    const userEmail = registerDto.email;
    const existedUser = await this.findOneByEmail(userEmail);
    // user existed
    if (existedUser) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This email existed',
      }, HttpStatus.FORBIDDEN);
    }
    // check passwordConfirmation
    if (registerDto.password != registerDto.passwordConfirmation) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Password confirmation do not match',
      }, HttpStatus.FORBIDDEN);
    }
    // bcrypt hash password
    const saltRounds = +process.env.SAlT_ROUNDS;
    const myPlaintextPassword = registerDto.password;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    registerDto.password = hash;
    registerDto.role = role; 

    const newUser = this.usersRepository.create(registerDto);

    return this.usersRepository.save(newUser);
  }

  async loginUser(loginDto: LoginDto): Promise<any> {
    const userEmail = loginDto.email;
    const existedUser = await this.findOneByEmail(userEmail);
    // user existed
    if (!existedUser) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This email did not exist',
      }, HttpStatus.FORBIDDEN);
    }

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

    return { expired_at, access_token, refresh_token, userId, userEmail };
  }

  async updateUser(id: number): Promise<Users> {
    try {
      const user = await this.usersRepository.findOneByOrFail({id});

      return this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  // async deleteUser(id: number): Promise<Users> {
  //     const user = await this.getOneById(id);
  //     return this.usersRepository.remove(user);
  // }
} 