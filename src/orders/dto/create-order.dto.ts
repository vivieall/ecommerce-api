import { Products } from 'src/products/entities/products.entity';

export class CreateOrderDto {
  userId: string;

  // [{ id: '123e4567-e89b-12d3-a456-426614174000' }]
  products: Partial<Products[]>;
}
