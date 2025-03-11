import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from './product.entity';
import { ProductParams } from './products.controller';
import { Category } from './category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  public getAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  public getOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id }, relations: ['category'] });
  }


  public async create(product: ProductParams): Promise<Product> {
    const category = await this.categoryRepository.findOne({ where: { id: product.categoryID } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const productNew = this.productRepository.create({
      name: product.name,
      description: product.description,
      price: product.price,
      category: category, 
    });

    return this.productRepository.save(productNew);
  }

  public async update(params: ProductParams, id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (params.categoryID) {
      const category = await this.categoryRepository.findOne({ where: { id: params.categoryID } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }

    product.name = params.name;
    product.description = params.description;
    product.price = params.price;

    return this.productRepository.save(product);
  }

  public async delete(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete({ id });
    return product;
  }
}
