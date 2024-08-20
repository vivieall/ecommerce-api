import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository){}

  create(createProduct: Product) {
    return this.productRepository.save(createProduct)
  }

  findAll(page: number, limit: number): Product[] {
    return this.productRepository.findAll(page, limit)
  }

  findOne(id: string): Product {
    return this.productRepository.findOne(id)
  }

  update(id: string, updateProduct: Product): number {
    return this.productRepository.update(id, updateProduct)
  }

  remove(id: string): number {
    return this.productRepository.delete(id)
  }
}
