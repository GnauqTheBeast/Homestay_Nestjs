import { Injectable } from '@nestjs/common';
import { Booking } from './entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingDto } from './dto/booking.dto';
import { httpErrors } from 'src/shareEntire/exception-filter/http-errors.const';
import { Homestay } from 'src/homestay/entity/homestay.entity';
import { stringToDate, verifyJWT } from 'src/shareEntire/utils';
import { Users } from 'src/users/entity/users.entity';
import { InterfaceBooking } from './interface/booking.interface';
import { UsersService } from 'src/users/users.service';
import { HomestayService } from 'src/homestay/homestay.service';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
        private readonly homestayService: HomestayService,
        private readonly usersService: UsersService,
    ) {}

    async bookingHomestay(homestayId: number, bookingDto: BookingDto, access_token: string): Promise<any> {
        // check if it conflict booking with other user 
        // const conflictBooking = await this.bookingRepository.findOne({
        //     relations: {
        //         homestay: true,
        //     },
        //     where: {
        //         homestay: {
        //             id: homestayId
        //         },
        //         checkIn: MoreThanOrEqual(checkIn),
        //         checkOut: LessThanOrEqual(checkOut)
        //     },
        // });
        // console.log(conflictBooking)
        const checkIn = stringToDate(bookingDto.checkIn);
        const checkOut = stringToDate(bookingDto.checkOut);

        const homestay = await this.homestayService.getHomestayById(homestayId);

        const resp = await verifyJWT(access_token);
        const user = await this.usersService.getOneById(resp.id);

        // save information booking in DB
        const newBooking = this.bookingRepository.create({ checkIn: checkIn, checkOut: checkOut, price: homestay.price, users: user, homestay: homestay});
        return this.bookingRepository.save(newBooking);
    }
}
