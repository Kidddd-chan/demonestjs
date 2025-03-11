import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import ProductModel from './product.model';

@Resolver()
export class ProductsResolver {
  constructor(private productService: ProductsService) {}
  @Query(() => [ProductModel])
  async getProduct() {
    return this.productService.getAll();
  }

  @Query(() => ProductModel)
  async getoneProduct(@Args('id') id: number) {
    return this.productService.getOne(id);
  }

  @Mutation(() => ProductModel)
  async createProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('price') price: number,
    @Args('categoryId') categoryID: number,  
  ) {
    const params = {
      name,
      description,
      price,
      categoryID,
    };
    return this.productService.create(params);
  }
  @Mutation(() => ProductModel)
  async deleteProduct(@Args('id') id: number) {
    return this.productService.delete(id);
  }
}
