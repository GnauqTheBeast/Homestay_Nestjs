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
    default: "https://images.unsplash.com/photo-1604142056225-1feabdac3af1?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  })
  images: string;

  @Column({ default: 0 })
  bookingCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ type: "text", nullable: false })
  slug: string;

  @Column({ type: "text", default: "Welcome to our cozy homestay nestled in the heart of nature. Our charming retreat offers a peaceful escape from the hustle and bustle of city life", nullable: false })
  description: string;

  @Column({ type: "text", default: "WiFi, Kitchen, Air Conditioning, Free Parking", nullable: false })
  service: string;

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