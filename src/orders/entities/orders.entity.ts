import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany, ManyToOne, JoinTable, OneToOne } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { OrderDetails } from '../../order-details/entities/order-details.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @ApiProperty({
    required: true,
    name: 'Order date is required'
  })
  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
