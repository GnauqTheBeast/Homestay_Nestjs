import slugify from 'slugify';
import { Booking } from 'src/booking/entity/booking.entity';
import { Images } from 'src/images/entity/images.entity';
import { Users } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, BeforeInsert, BeforeUpdate, UpdateDateColumn, ManyToOne, AfterUpdate } from 'typeorm';

@Entity()
export class Homestay {
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
  updated_at: Date;

  @Column({
    length: 256,
  })
  address: string;

  @Column({ nullable: true })
  rateStar: number

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false })
  price: number;

  @Column({
    nullable: true,
    default: "https://unsplash.com/photos/green-plants-on-brown-concrete-building-KLOW1bD616Y"
  })
  images: string;

  @Column({ default: 0 })
  bookingCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ type: "text", nullable: false })
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.name, { lower: true });
  }

  @ManyToOne(() => Users, (host) => host.homestay)
  host: Users

  @OneToMany(() => Booking, (booking) => booking.homestay, {onDelete: 'CASCADE'})
  booking: Booking

  @OneToMany(() => Images, (images) => images.homestay)
  photos: Images[]
}