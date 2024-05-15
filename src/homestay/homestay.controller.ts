import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HomestayService } from './homestay.service';
import { Homestay } from './entity/homestay.entity';

@Controller('homestay')
@ApiTags('homestay')
export class HomestayController {
    constructor(private readonly homestayService: HomestayService) {}

    @Get('all')
    async getAllHomestay(): Promise<Homestay[]> {
        return this.homestayService.getAllHomestay();
    }

    @Get('trending')
    async getTrendingHomestay(): Promise<Homestay[]> {
        return this.homestayService.getTrendingHomestay();
    }

    @Get('top')
    async getTopHomestay(): Promise<Homestay[]> {
        return this.homestayService.getTopHomestay();
    }

    @Get('cheapest')
    async getCheapestHomestay(): Promise<Homestay[]> {
        return this.homestayService.getCheapestHomestay();
    }

    @Get(':slug')
    async getHomestay(@Param('slug') slug: string): Promise<Homestay> {
        return this.homestayService.getHomestay(slug);
    }
}
