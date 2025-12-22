import { CreateOnCityProductRequestDto } from 'src/app/controller/oncity/products/create/dto/CreateOnCityProductRequest.dto';
import { OnCityProduct } from 'src/core/entities/oncity/products/create/OnCityProduct';

export interface IOnCityCreateProductRepository {
  create(payload: CreateOnCityProductRequestDto): Promise<OnCityProduct>;
}
