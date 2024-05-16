import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from './entity/comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { Users } from 'src/users/entity/users.entity';
import { Homestay } from 'src/homestay/entity/homestay.entity';
import { UsersService } from 'src/users/users.service';
import { HomestayService } from 'src/homestay/homestay.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Homestay, Comments])],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, HomestayService],
  exports: [CommentsService]
})
export class CommentsModule {}
