import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { EditUsersDto, UsersDto } from './dto/users.dto';
import { HostGuard } from 'src/auth/guards/host.guard';
import { HomestayService } from 'src/homestay/homestay.service';
import { CreateHomestayDto, EditHomestayDto } from 'src/homestay/dto/homestay.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly homestayService: HomestayService
    ) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('me')
    async getProfile(@Req() req: Request): Promise<Users> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        return this.usersService.getOneById(access_token);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('me/edit')
    async editProfile(@Req() req: Request): Promise<any> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        return this.usersService.getOneById(access_token);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Patch('me/edit')
    async putEditProfile(@Body() editUsersDto: EditUsersDto, @Req() req: Request): Promise<Users> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        return this.usersService.editUser(editUsersDto, access_token);
    }

    @UseGuards(HostGuard)
    @ApiBearerAuth()
    @Post('host/create-homestay')
    async createHomestay(@Body() createHomestayDto: CreateHomestayDto, @Req() req: Request): Promise<any> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        return this.homestayService.createHomestay(createHomestayDto, access_token);
    }

    @UseGuards(HostGuard)
    @ApiBearerAuth()
    @Patch('host/edit-homestay/:homestayId')
    async editHomestay(@Body() editHomestayDto: EditHomestayDto, @Param('homestayId') homestayId: string, @Req() req: Request): Promise<any> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        return this.homestayService.editHomestay(editHomestayDto, Number(homestayId), access_token);
    }
}
