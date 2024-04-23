import { Module } from '@nestjs/common';
import { HomestayController } from './homestay.controller';
import { HomestayService } from './homestay.service';

@Module({
  controllers: [HomestayController],
  providers: [HomestayService]
})
export class HomestayModule {}
