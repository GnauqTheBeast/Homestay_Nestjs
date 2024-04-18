import { Homestay } from 'src/homestay/entity/homestay.entity';
import { Users } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  price: number;

  @ManyToOne(() => Users, (users) => users.booking)
  users: Users

  @ManyToOne(() => Homestay, (homestay) => homestay.booking)
  homestay: Homestay
}