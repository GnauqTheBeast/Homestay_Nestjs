import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HomestayService } from './homestay.service';
import { Homestay } from './entity/homestay.entity';

@Controller('homestay')
@ApiTags('homestay')
export class HomestayController {
    constructor(private readonly homestayService: HomestayService) {}

    @Get('trending')
    async getTrendingHomestay(): Promise<Homestay[]> {
        return this.homestayService.getTrendingHomestay();
    }

    @Get(':slug')
    async getHomestay(@Param('slug') slug: string): Promise<Homestay> {
        return this.homestayService.getHomestay(slug);
    }
}
