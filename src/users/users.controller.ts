import { Body, Controller, Get, Header, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @ApiHeader({
        name: 'access_token',
        description: 'access_token',
    })
    @Get('/me')
    async getProfile(@Headers('access_token') access_token: string): Promise<Users> {
        return this.usersService.getOneById(access_token);
    }
}
