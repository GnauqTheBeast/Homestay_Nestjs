import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { DatabaseModule } from 'db/database-sources';
import { UserModule } from './user/user.module';
import { CatsService } from './cats/cat.service';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}