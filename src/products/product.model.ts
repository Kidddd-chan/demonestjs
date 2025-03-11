import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Category } from './category.entity';
@ObjectType()
export default class ProductModel {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  description: string;

  @Field(() => ID)
  categoryId: number;

}
