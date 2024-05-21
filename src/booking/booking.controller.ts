import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from './dto/booking.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { HostGuard } from 'src/auth/guards/host.guard';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Post(':slug')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async bookingHomestay(@Param('slug') slug: string, @Req() req: Request, @Body() createBookingDto: CreateBookingDto): Promise<any> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        return this.bookingService.bookingHomestay(slug, createBookingDto, access_token);
    }

    @Get('booked')
    @UseGuards(HostGuard)
    @ApiBearerAuth()
    async getBookedHomestay(@Query('userId') userId: number): Promise<any> {
        return this.bookingService.getBookedHomestay(userId);
    }
}
