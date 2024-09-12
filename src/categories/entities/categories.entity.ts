import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Products } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn({ name: 'product_id' })
  products: Products[];
}
