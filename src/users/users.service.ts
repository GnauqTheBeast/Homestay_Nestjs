import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { httpErrors } from 'src/shareEntire/exception-filter/http-errors.const';
import { generateToken, verifyJWT } from 'src/shareEntire/utils';
import { UserRole } from './entity/users.entity';
import { EditUsersDto, changeActiveUsersDto } from './dto/users.dto';
import * as bcrypt from "bcrypt";
import { hashPassword } from 'src/shareEntire/utils/hash-password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
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
      throw new HttpException(httpErrors.NOT_VALID_BOOKING, HttpStatus.FORBIDDEN);
    }

    return users;
  }

  async findOneByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email
      },
      select: {
        id: true, 
        fullName: true,
        email: true, 
        phone: true, 
        role: true,
        status: true,
      }
    });
    return user; 
  }

  async getOneById(access_token: string): Promise<Users> {
    const resp = await verifyJWT(access_token);
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
    // hash password
    registerDto.password = hashPassword(registerDto.password);
    // role
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
    const status = existedUser.status;
    const userPhone = existedUser.phone;

    const payload = {
      id: userId, 
      userEmail: userEmail, 
      role: userRole, 
      userPhone: userPhone, 
      status: status,
    };
    const expired_at = Date.now() + (+process.env.ACCESS_TOKEN_EXPIRE_IN_SEC * 1000);

    const access_token = generateToken(payload, {
      expiresIn: (+process.env.ACCESS_TOKEN_EXPIRE_IN_SEC * 1000),
    });
    const refresh_token = generateToken(payload, {
      expiresIn: (+process.env.REFRESH_TOKEN_EXPIRE_IN_SEC * 1000),
    });

    return { expired_at, access_token, refresh_token, userId, userEmail};
  }

  async updateUser(id: number): Promise<Users> {
    try {
      const user = await this.usersRepository.findOneByOrFail({id});

      return this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Cant update',
      }, HttpStatus.FORBIDDEN);
    }
  }

  async editUser(editUsersDto: EditUsersDto, access_token: string): Promise<any> {
    try {
      const resp = await verifyJWT(access_token);
      const id = resp.id;

      editUsersDto.password = hashPassword(editUsersDto.password)

      await this.usersRepository
        .createQueryBuilder()
        .update(Users)
        .set(editUsersDto)
        .where("id = :id", { id: id })
        .execute();
      
      return this.usersRepository.findOneBy({
        id: id
      })
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Wrong password',
      }, HttpStatus.FORBIDDEN);
    }
  }

  async changeActiveUsers(changeActiveUsers: changeActiveUsersDto, id: number) {
    try {  
      await this.usersRepository
      .createQueryBuilder()
      .update(Users)
      .set(changeActiveUsers)
      .where("id = :id", { id: id })
      .execute();
    
      return this.usersRepository.findOneByOrFail({
        id: id,
      });
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error,
      }, HttpStatus.FORBIDDEN);
    }
  }

  async otpConfirmed(userEmail: string) {
    try {  
      await this.usersRepository
      .createQueryBuilder()
      .update(Users)
      .set({status: "active"})
      .where("email = :email", { email: userEmail })
      .execute();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error,
      }, HttpStatus.FORBIDDEN);
    }
  }

} 