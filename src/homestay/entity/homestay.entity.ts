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

  @Column()
  bookingCount: number;

  @Column()
  viewCount: number;

  @OneToMany(() => Booking, (booking) => booking.homestay)
  booking: Booking
}