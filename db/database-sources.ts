import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forRoot()],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: process.env.HOST,
                port: +process.env.PORT,
                username: process.env.USERNAME_DB,
                password: process.env.PASSWORD_DB,
                database: process.env.DATABASE,
                entities: ['dist/**/*.entity.js'],
                migrations: ['dist/db/migrations/*.js'],
                synchronize: true,
                debug: false,       
            }),
            inject: [ConfigService],
        })
    ],
})
export class DatabaseModule {}