import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

  getAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({
      email: email
    });
    return user; 
  }

  async getOneById(id: number): Promise<Users> {
    try {
      const user = await this.usersRepository.findOneBy({
        id: id
      })
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(registerDto: RegisterDto): Promise<Users> {
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
    const newUser = this.usersRepository.create(registerDto);

    return this.usersRepository.save(newUser)
  }

  async loginUser(loginDto: LoginDto): Promise<Users> {
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
    return existedUser;
  }

  async updateUser(id: number): Promise<Users> {
    try {
      const user = await this.usersRepository.findOneByOrFail({id});

      return this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number): Promise<Users> {
      const user = await this.getOneById(id);
      return this.usersRepository.remove(user);
  }
} 