import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import {
  IOnCityGetStockBySkuRepository,
  OnCitySkuStock
} from 'src/core/adapters/repositories/oncity/products/get-stock/IOnCityGetStockBySkuRepository';

@Injectable()
export class OnCityGetStockBySkuRepository implements IOnCityGetStockBySkuRepository {
  constructor(private readonly httpClient: OnCityHttpClient) {}

  async getBySku(skuId: number): Promise<OnCitySkuStock> {
    const response = await this.httpClient.get<any>(`/api/logistics/pvt/inventory/skus/${skuId}`);

    const balance = response?.balance ?? [];

    let total = 0;
    let available = 0;

    for (const warehouse of balance) {
      total += warehouse.totalQuantity ?? 0;
      available += (warehouse.totalQuantity ?? 0) - (warehouse.reservedQuantity ?? 0);
    }

    return {
      total,
      available
    };
  }
}
