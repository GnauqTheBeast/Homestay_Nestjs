import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Homestay } from './entity/homestay.entity';
import { Not, Repository } from 'typeorm';
import { CreateHomestayDto, EditHomestayDto } from './dto/homestay.dto';
import { verifyJWT } from 'src/shareEntire/utils';
import slugify from 'slugify';

@Injectable()
export class HomestayService {
    constructor(
        @InjectRepository(Homestay) private homestayRepository: Repository<Homestay>,
    ) {}

    async getHomestay(slug: string): Promise<Homestay> {
      const homestay = await this.homestayRepository.findOne({
          where: {
            slug: slug 
          },
        },
      );

      if (!homestay) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'not exist',
        }, HttpStatus.FORBIDDEN);
      }

      return homestay;
    }

    async getHomestayById(homestayId: number): Promise<Homestay> {
      const homestay = await this.homestayRepository.findOne({
          where: {
            id: homestayId
          },
        },
      );

      if (!homestay) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'not exist',
        }, HttpStatus.FORBIDDEN);
      }

      return homestay;
    }

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

    async editHomestay(editHomestayDto: EditHomestayDto, homestayId: number, access_token: string): Promise<any> {
        try {
          const resp = await verifyJWT(access_token);
          const userId = resp.id;

          const existedHomestay = await this.homestayRepository.findOne({
            where: { id: homestayId },
            relations: ['host'] 
          });

          if (!existedHomestay) {
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'This homestay not existed',
            }, HttpStatus.FORBIDDEN);
          }

          if (userId != existedHomestay.host.id) {
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'not permission',
            }, HttpStatus.FORBIDDEN);
          }

          const homestayName = editHomestayDto.name;
          const existedNameHomestay = await this.homestayRepository.findOne({
            where: {
              name: homestayName,
              id: Not(existedHomestay.id)
            }
          });

          if (existedNameHomestay) {
            console.log(existedNameHomestay)
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'name existed',
            }, HttpStatus.FORBIDDEN);
          }

          const slug = slugify(editHomestayDto.name, { lower: true });

          await this.homestayRepository
            .createQueryBuilder()
            .update(Homestay)
            .set({...editHomestayDto, slug: slug})
            .where("id = :homestayId", { homestayId: homestayId })
            .execute();
          
          return this.homestayRepository.findOneBy({
            id: homestayId
          })
        } catch (error) {
          throw error;
        }
    }

    async deleteHomestay(homestayId: number, access_token: string) {
      try {  
        const resp = await verifyJWT(access_token);
        const userId = resp.id;

        const existedHomestay = await this.homestayRepository.findOne({
          where: { id: homestayId },
          relations: ['host'] 
        });

        console.log(existedHomestay);

        if (!existedHomestay) {
          throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'This homestay not existed',
          }, HttpStatus.FORBIDDEN);
        }

        if (userId != existedHomestay.host.id) {
          throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'not permission',
          }, HttpStatus.FORBIDDEN);
        }

        await this.homestayRepository
          .createQueryBuilder()
          .delete()
          .from(Homestay)
          .where("id = :id", { id: homestayId })
          .execute()
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: error,
        }, HttpStatus.FORBIDDEN);
      }
    }

    async getTrendingHomestay(): Promise<Homestay[]> {
      const homestays = await this.homestayRepository.find({
        order: {
          viewCount: 'DESC'
        },
        take: 4
      });

      return homestays;
    }

    async getCheapestHomestay(): Promise<Homestay[]> {
      const homestays = await this.homestayRepository.find({
        order: {
          price: 'ASC'
        },
        take: 4
      });

      return homestays;
    }

    async getTopHomestay(): Promise<Homestay[]> {
      const homestays = await this.homestayRepository.find({
        order: {
          bookingCount: 'DESC'
        },
        take: 8
      });

      return homestays;
    }

    async getAllHomestay(): Promise<Homestay[]> {
      const homestays = await this.homestayRepository.find({});

      return homestays;
    }

    async viewIncrease(slug: string): Promise<void> {
      await this.homestayRepository
          .createQueryBuilder()
          .update(Homestay)
          .set({ viewCount: () => "viewCount + 1" })
          .where("slug = :slug", { slug })
          .execute();
    }
}
