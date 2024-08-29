import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadProductImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });

    const uploadedImage = await this.fileUploadRepository.uploadImage(file);
    console.log(uploadedImage)

    await this.productsRepository.update(product.id, {
      imgUrl: uploadedImage.secure_url,
    });

    const updatedProduct = await this.productsRepository.findOneBy({
      id: productId,
    });

    return updatedProduct;
  }
}
