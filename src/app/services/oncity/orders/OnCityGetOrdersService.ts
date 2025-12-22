import { Injectable, Inject } from '@nestjs/common';
import { IOnCityGetOrdersRepository } from 'src/core/adapters/repositories/oncity/orders/IOnCityGetOrdersRepository';
import { OnCityOrderListMapper } from 'src/core/entities/oncity/orders/mapper/OnCityOrderMapper';
import { MarketplaceOrder } from 'src/core/entities/oncity/orders/OnCityOrder';

@Injectable()
export class OnCityGetOrdersService {
  constructor(
    @Inject('IOnCityGetOrdersRepository')
    private readonly ordersRepository: IOnCityGetOrdersRepository
  ) {}

  async list(): Promise<MarketplaceOrder[]> {
    const response = await this.ordersRepository.list();

    return response.list.map(OnCityOrderListMapper.toEntity);
  }
}
