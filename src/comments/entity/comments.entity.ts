import { Homestay } from "src/homestay/entity/homestay.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    length: 256,
  })
  text: string;

  @ManyToOne(() => Users, (user) => user.comments)
  user: Users

  @ManyToOne(() => Homestay, (homestay) => homestay.comments)
  homestay: Homestay
}