import { Booking } from 'src/booking/entity/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, Index } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({nullable: true})
  password: string;

  @Column({
    length: 50,
  })
  fullName: string;

  @Column({
    length: 15,
    nullable: true
  })
  phone: string

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({nullable: true})
  role: string;

  @OneToMany(() => Booking, (booking) => booking.users, {onDelete: 'CASCADE'})
  booking: Booking
}