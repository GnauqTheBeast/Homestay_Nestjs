import { Homestay } from 'src/homestay/entity/homestay.entity';
import { Users } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Timestamp } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  price: number;

  @Column({ type: 'date' })
  checkIn: Date;

  @Column({ type: 'date' })
  checkOut: Date;

  @Column()
  numPeople: number;

  @Column({ 
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending',
    nullable: false,
    type: 'enum',
  })
  status: string;

  @ManyToOne(() => Users, (users) => users.booking)
  users: Users

  @ManyToOne(() => Homestay, (homestay) => homestay.booking)
  homestay: Homestay
}