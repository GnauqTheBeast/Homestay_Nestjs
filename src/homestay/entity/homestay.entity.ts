import { Booking } from 'src/booking/entity/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Homestay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    length: 256,
  })
  address: string;

  @Column()
  rateStar: number

  @Column({ default: true })
  isActive: boolean;

  @Column()
  price: number;

  @Column({ default: 0 })
  bookingCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column()
  slug: string;

  @OneToMany(() => Booking, (booking) => booking.homestay)
  booking: Booking
}