import { Booking } from 'src/booking/entity/booking.entity';
import { Comments } from 'src/comments/entity/comments.entity';
import { Homestay } from 'src/homestay/entity/homestay.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, Index } from 'typeorm';
export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
  HOST = "host"
}

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

  @Column({ default: "pending" })
  status: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER
  })
  role: UserRole;

  @OneToMany(() => Booking, (booking) => booking.users, {onDelete: 'CASCADE'})
  booking: Booking[];

  @OneToMany(() => Homestay, (homestay) => homestay.host, {onDelete: 'CASCADE'})
  homestay: Homestay

  @OneToMany(() => Comments, (comments) => comments.user, {onDelete: 'CASCADE'})
  comments: Comments;
}