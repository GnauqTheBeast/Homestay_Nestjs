import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookingDto } from './dto/booking.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Post(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async bookingHomestay(@Param('id') id: string, @Req() req: Request, @Body() bookingDto: BookingDto): Promise<any> {
        const authorization = req.headers['authorization'];
        const access_token = authorization.replace("Bearer ", "");
        return this.bookingService.bookingHomestay(Number(id), bookingDto, access_token);
    }
}
