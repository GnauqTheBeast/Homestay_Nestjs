import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/auth.dto';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.adminService.loginAdmin(loginDto);
    }

    @Get('all-users')
    async getAllUsers(@Query('page') page: number) {
        return this.adminService.getAll(page);
    }
}
