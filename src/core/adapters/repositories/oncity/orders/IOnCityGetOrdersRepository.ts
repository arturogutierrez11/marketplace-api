import { OnCityOrder } from 'src/core/entities/oncity/orders/OnCityOrder';

export interface IOnCityGetOrdersRepository {
  getOrders(params: { fechaDesde: string; fechaHasta: string }): Promise<OnCityOrder[]>;
}
