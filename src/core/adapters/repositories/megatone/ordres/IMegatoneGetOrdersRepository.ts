import { MegatoneOrder } from 'src/core/entities/megatone/orders/MegatoneOrder';

export interface IMegatoneGetOrdersRepository {
  getOrders(params: { fechaDesde: string; fechaHasta: string }): Promise<MegatoneOrder[]>;
}
