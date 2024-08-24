import { Entity, Column, PrimaryGeneratedColumn,JoinColumn, ManyToMany, ManyToOne, JoinTable, OneToOne } from 'typeorm';
import { Orders } from 'src/orders/entities/orders.entity';
import { Products } from 'src/products/entities/products.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ManyToMany(() => Products)
  @JoinTable({ name: 'order_details_products' })
  products: Products[];
}
