import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'db/database-sources';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { HomestayModule } from './homestay/homestay.module';
import { LoginMiddleware } from './middlewares/login.middleware';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    AdminModule,
    CategoryModule,
    HomestayModule,
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