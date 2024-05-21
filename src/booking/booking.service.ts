import { Injectable } from '@nestjs/common';
import { Booking } from './entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/booking.dto';
import { stringToDate, verifyJWT } from 'src/shareEntire/utils';
import { UsersService } from 'src/users/users.service';
import { HomestayService } from 'src/homestay/homestay.service';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
        private readonly homestayService: HomestayService,
        private readonly usersService: UsersService,
    ) {}

    async bookingHomestay(slug: string, createBookingDto: CreateBookingDto, access_token: string): Promise<any> {
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
        const checkIn = createBookingDto.checkIn;
        const checkOut = createBookingDto.checkOut;

        const homestay = await this.homestayService.getHomestay(slug);

        const user = await this.usersService.getOneById(access_token);

        const numPeople = createBookingDto.numPeople;

        // save information booking in DB
        const newBooking = this.bookingRepository.create({ checkIn: checkIn, checkOut: checkOut, price: homestay.price, users: user, homestay: homestay, numPeople: numPeople});
        return this.bookingRepository.save(newBooking);
    }

    async getBookedHomestay(userId: number): Promise<Booking[]> {
        const booked = await this.bookingRepository
                .createQueryBuilder("booking")
                .innerJoinAndSelect('booking.homestay', 'homestay')
                .innerJoinAndSelect('homestay.host', 'host')
                .innerJoinAndSelect('booking.users', 'users')
                .where('host.id = :userId', { userId })
                .getMany();

        return booked;
    }
}
