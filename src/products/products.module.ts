import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { Products } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { Categories } from 'src/categories/entities/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([Categories]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, CategoriesRepository],
})
export class ProductsModule {}