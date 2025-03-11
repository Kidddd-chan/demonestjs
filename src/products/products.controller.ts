import { Controller, Get, Put, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

export interface ProductParams {
  name: string;
  description: string;
  price: number;
  categoryID: number;
}

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get('')
  public async index() {
    const products = await this.productService.getAll();
    return { products };
  }
  @Put('update/:id')
  public async update(@Body() body: ProductParams, @Param('id') id: number) {
    console.log(body);

    const product = await this.productService.update(body, id);

    return { message: 'Update thành công!!!', product };
  }

  @Post('create')
  public async create(@Body() body: ProductParams) {
    console.log(body);

    const product = await this.productService.create(body);

    return { message: 'Tạo mới thành công!!!', product };
  }
}
