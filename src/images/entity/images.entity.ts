import { Homestay } from "src/homestay/entity/homestay.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

    @Column()
    url: string;

    @ManyToOne(() => Homestay, (homestay) => homestay.images)
    homestay: Homestay
}