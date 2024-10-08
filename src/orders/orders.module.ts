import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { OrderDetails } from './../order-details/entities/order-details.entity';
import { Products } from './../products/entities/products.entity';
import { Users } from './../users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetails]),
    TypeOrmModule.forFeature([Orders]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Products]),
  ],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}