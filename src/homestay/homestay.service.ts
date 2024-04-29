import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Homestay } from './entity/homestay.entity';
import { Repository } from 'typeorm';
import { CreateHomestayDto, EditHomestayDto } from './dto/homestay.dto';
import { verifyJWT } from 'src/shareEntire/utils';

@Injectable()
export class HomestayService {
    constructor(
        @InjectRepository(Homestay) private homestayRepository: Repository<Homestay>,
    ) {}

    async createHomestay(createHomestayDto: CreateHomestayDto, access_token: string): Promise<Homestay> {
        const resp = await verifyJWT(access_token);
        
        const homestayName = createHomestayDto.name;
        const existedHomestay = await this.homestayRepository.findOneBy({
            name: homestayName
        });
        
        if (existedHomestay) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This homestay existed',
            }, HttpStatus.FORBIDDEN);
        }

        const newHomestay = this.homestayRepository.create({...createHomestayDto, host: resp.id});

        return this.homestayRepository.save(newHomestay);
    }

    // async editHomestay(editHomestayDto: EditHomestayDto): Promise<any> {
    //     try {

    //       await this.homestayRepository
    //         .createQueryBuilder()
    //         .update(Homestay)
    //         .set(editHomestayDto)
    //         .where("id = :id", { id: id })
    //         .execute();
          
    //       return this.usersRepository.findOneBy({
    //         id: id
    //       })
    //     } catch (error) {
    //       throw new HttpException({
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'Wrong password',
    //       }, HttpStatus.FORBIDDEN);
    //     }
    //   }
}
