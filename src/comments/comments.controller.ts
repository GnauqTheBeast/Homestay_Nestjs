import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from './entity/comments.entity';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get(':homestayId')
    async getCommentsByHomestayId(@Param('homestayId') homestayId: string): Promise<Comments[]> {
        return this.commentsService.getCommentsByHomestayId(+homestayId);
    }
}
