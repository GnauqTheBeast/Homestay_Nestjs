import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAll(): Promise<Users[]> {
    return this.usersRepository.find();
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

  createUser(usersDto: UsersDto): Promise<Users> {
      const newUser = this.usersRepository.create(usersDto);
      return this.usersRepository.save(newUser);
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