import { OnCityUpdateStatusProduct } from 'src/core/entities/oncity/products/update-status/OnCityUpdateStatusProduct';

export interface IOnCityUpdateProductRepository {
  update(productId: string, payload: OnCityUpdateStatusProduct);
}
