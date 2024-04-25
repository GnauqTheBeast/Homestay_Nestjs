import { Body, Controller, Get, Header, Headers, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { EditUsersDto, UsersDto } from './dto/users.dto';
import { RegisterDto } from 'src/auth/dto/auth.dto';

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

    @UseGuards(AuthGuard)
    @ApiHeader({
        name: 'access_token',
        description: 'access_token',
    })
    @Get('/me/edit')
    async editProfile(@Headers('access_token') access_token: string): Promise<Users> {
        return this.usersService.getOneById(access_token);
    }

    @UseGuards(AuthGuard)
    @ApiHeader({
        name: 'access_token',
        description: 'access_token',
    })
    @Patch('/me/edit')
    async putEditProfile(@Body() editUsersDto: EditUsersDto, @Headers('access_token') access_token: string): Promise<Users> {
        return this.usersService.editUser(editUsersDto, access_token);
    }
}
