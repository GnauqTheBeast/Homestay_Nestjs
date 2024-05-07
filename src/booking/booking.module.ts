import { Module } from '@nestjs/common';
import { Booking } from './entity/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entity/users.entity';
import { Homestay } from 'src/homestay/entity/homestay.entity';
import { HomestayService } from 'src/homestay/homestay.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Homestay, Users])],
  controllers: [BookingController],
  providers: [BookingService, AuthGuard, AuthService, UsersService, HomestayService],
  exports: [BookingService]
})
export class BookingModule {}
