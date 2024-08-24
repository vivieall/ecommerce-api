import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private ProductsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.ProductsRepository.getProducts(page, limit);
  }

  getProduct(id: string) {
    return this.ProductsRepository.getProduct(id);
  }

  addProducts() {
    return this.ProductsRepository.addProducts();
  }

  updateProduct(id: string, product: any) {
    return this.ProductsRepository.updateProduct(id, product);
  }
}
