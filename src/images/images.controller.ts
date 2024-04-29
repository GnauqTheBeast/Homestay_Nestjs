import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HostGuard } from 'src/auth/guards/host.guard';

@Controller('images')
export class ImagesController {
    // @UseGuards(HostGuard)
    // @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file', {
        dest: './uploads'
      }))
    @Post('upload')
    async postImages(@UploadedFile() file: Express.Multer.File): Promise<any> {
        console.log('file', file);

        return 'file uploaded';
    }                   
}
