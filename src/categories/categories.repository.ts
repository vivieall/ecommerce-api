import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from 'src/utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {
    for (const element of data) {
      const categoryExists = await this.categoriesRepository.findOne({
        where: { name: element.category },
      });

      if (!categoryExists) {
        const newCategory = this.categoriesRepository.create({ name: element.category });
        await this.categoriesRepository.save(newCategory);
      }
    }

    return 'Categorías agregadas.';
  }
  
}