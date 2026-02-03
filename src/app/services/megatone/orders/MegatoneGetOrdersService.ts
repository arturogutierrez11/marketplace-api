import { Injectable, Inject } from '@nestjs/common';
import { IMegatoneGetOrdersRepository } from 'src/core/adapters/repositories/megatone/ordres/IMegatoneGetOrdersRepository';
import { MegatoneOrder } from 'src/core/entities/megatone/orders/MegatoneOrder';

@Injectable()
export class MegatoneGetOrdersService {
  constructor(
    @Inject('IMegatoneGetOrdersRepository')
    private readonly ordersRepository: IMegatoneGetOrdersRepository
  ) {}

  async list(params: { fechaDesde: string; fechaHasta: string }): Promise<MegatoneOrder[]> {
    return this.ordersRepository.getOrders(params);
  }
}
