import { Inject, Injectable } from '@nestjs/common';
import { IOnCityGetOrdersRepository } from 'src/core/adapters/repositories/oncity/orders/IOnCityGetOrdersRepository';
import { OnCityOrder } from 'src/core/entities/oncity/orders/OnCityOrder';

@Injectable()
export class OnCityGetOrdersService {
  constructor(
    @Inject('IOnCityGetOrdersRepository')
    private readonly ordersRepository: IOnCityGetOrdersRepository
  ) {}

  async execute(params: { fechaDesde: string; fechaHasta: string }): Promise<OnCityOrder[]> {
    return this.ordersRepository.getOrders({
      fechaDesde: params.fechaDesde,
      fechaHasta: params.fechaHasta
    });
  }
}
