import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { UserRole } from 'src/users/entity/users.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.adminService.loginAdmin(loginDto);
    }

    @UseGuards(AdminGuard)
    @ApiHeader({
        name: 'access_token',
        description: 'access_token',
    })
    @Get('all-users')
    async getAllUsers(@Query('page') page: number) {
        return this.adminService.getAll(page);
    }

    @UseGuards(AdminGuard)
    @ApiHeader({
        name: 'access_token',
        description: 'access_token',
    })
    @Post('create-host-user')
    async createHostUsers(@Body() registerDto: RegisterDto, role: UserRole = UserRole.HOST) {
        return this.adminService.createSpecialUsers(registerDto, role);
    }

    @UseGuards(AuthGuard)
    @ApiHeader({
        name: 'access_token',
        description: 'access_token',
    })
    @Post('create-admin')
    async createAdminUsers(@Body() registerDto: RegisterDto, role: UserRole = UserRole.ADMIN) {
        return this.adminService.createSpecialUsers(registerDto, role);
    }
}
