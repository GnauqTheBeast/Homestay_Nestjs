import { Booking } from 'src/booking/entity/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, Timestamp, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    length: 50,
  })
  fullName: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  role: string;

  @OneToMany(() => Booking, (booking) => booking.users, {onDelete: 'CASCADE'})
  booking: Booking
}