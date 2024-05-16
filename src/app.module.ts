import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'db/database-sources';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { LoginMiddleware } from './middlewares/login.middleware';
import { HomestayModule } from './homestay/homestay.module';
import { ImagesModule } from './images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { SmsModule } from './sms/sms.module';
import { OtpModule } from './otp/otp.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BookingModule } from './booking/booking.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({ dest: './uploads' }),
    UsersModule,
    AuthModule,
    AdminModule,
    CategoryModule,
    HomestayModule,
    ImagesModule,
    SmsModule,
    OtpModule,
    ScheduleModule.forRoot(),
    BookingModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginMiddleware)
      .forRoutes('auth');
  }
}