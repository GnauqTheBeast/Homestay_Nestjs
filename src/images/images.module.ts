import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { HostGuard } from 'src/auth/guards/host.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ImagesService, HostGuard],
  controllers: [ImagesController]
})
export class ImagesModule {}
