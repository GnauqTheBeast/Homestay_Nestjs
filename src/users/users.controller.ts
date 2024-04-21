import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { ApiTags } from '@nestjs/swagger';
import { UsersDto } from './dto/users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    // @Get(':id')
    // async getOneById(@Param('id') id: number): Promise<Users> {
    //     return this.usersService.getOneById(id);
    // }
}
