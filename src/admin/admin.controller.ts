import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { UserRole } from 'src/users/entity/users.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { changeActiveUsersDto } from 'src/users/dto/users.dto';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.adminService.loginAdmin(loginDto);
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @Get('all-users')
    async getAllUsers(@Query('page') page: number) {
        return this.adminService.getAll(page);
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @Post('create-host-users')
    async createHostUsers(@Body() registerDto: RegisterDto, role: UserRole = UserRole.HOST) {
        return this.adminService.createSpecialUsers(registerDto, role);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post('create-admin')
    async createAdminUsers(@Body() registerDto: RegisterDto, role: UserRole = UserRole.ADMIN) {
        return this.adminService.createSpecialUsers(registerDto, role);
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @Patch('change-active-users/:id')
    async changeActiveUsers(@Body() changeActiveUsers: changeActiveUsersDto, @Param('id') id: number) {
        return this.adminService.changeActiveUsers(changeActiveUsers, id);
    }
}
