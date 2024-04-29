import { Module } from '@nestjs/common';
import { HomestayController } from './homestay.controller';
import { HomestayService } from './homestay.service';
import { Homestay } from './entity/homestay.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HostGuard } from 'src/auth/guards/host.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Homestay]), ConfigModule],
  controllers: [HomestayController],
  providers: [HomestayService],
  exports: [HomestayService]
})
export class HomestayModule {}
