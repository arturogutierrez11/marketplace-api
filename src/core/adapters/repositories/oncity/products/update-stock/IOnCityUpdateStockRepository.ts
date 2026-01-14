import { OnCityUpdateStockResponseDto } from 'src/core/entities/oncity/products/update-stock/dto/OnCityUpdateStockResponseDto';
import { OnCityUpdateStock } from 'src/core/entities/oncity/products/update-stock/OnCityUpdateStock';

export interface IOnCityUpdateStockRepository {
  execute(data: OnCityUpdateStock): Promise<OnCityUpdateStockResponseDto>;
}
