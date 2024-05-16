import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comments } from './entity/comments.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments) private commentsRepository: Repository<Comments>,
    ) {}

    async getCommentsByHomestayId(homestayId: number): Promise<Comments[]> {
        const comments = await this.commentsRepository.find({
            relations: {
                user: true,
                homestay: true,
            },
            where: {
                homestay: {
                    id: homestayId
                }
            }
        });

        return comments;
    }
}
