import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Cat } from 'src/cats/cats.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '12345',
                database: 'homestay',
                entities: [User, Cat],
                synchronize: true,
                debug: false,       
            }),
            inject: [ConfigService],
        })
    ],
})

export class DatabaseModule {}