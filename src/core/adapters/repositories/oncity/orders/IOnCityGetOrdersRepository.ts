import { OnCityOrdersListResponseDto } from 'src/core/entities/oncity/orders/dto/OnCityOrderResponseDto';

export interface IOnCityGetOrdersRepository {
  list(): Promise<OnCityOrdersListResponseDto>;
}
