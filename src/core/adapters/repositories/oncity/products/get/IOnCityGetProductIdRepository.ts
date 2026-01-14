import { OnCityGetProductId } from 'src/core/entities/oncity/products/get/OnCityGetProductId';

export interface IOnCityGetProductIdRepository {
  execute(from: number, to: number): Promise<OnCityGetProductId>;
}
