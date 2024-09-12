import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Categories } from '../../categories/entities/categories.entity';
import { OrderDetails } from '../../order-details/entities/order-details.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Products {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 100 })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @Column({
    type: 'text',
    default: 'https://assets.soyhenry.com/LOGO-REDES-01_og.jpg',
  })
  imgUrl: string;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;
}
