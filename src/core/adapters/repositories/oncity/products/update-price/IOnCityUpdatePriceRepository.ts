import { OnCityUpdatePrice } from 'src/core/entities/oncity/products/update-price/OnCityUpdatePrice';

export interface IOnCityUpdatePriceRepository {
  execute(data: OnCityUpdatePrice): Promise<void>;
}
