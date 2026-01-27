import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import {
  IOnCityGetPriceBySkuRepository,
  OnCitySkuPrice
} from 'src/core/adapters/repositories/oncity/products/get-price/IOnCityGetPriceBySkuRepository';

@Injectable()
export class OnCityGetPriceBySkuRepository implements IOnCityGetPriceBySkuRepository {
  constructor(private readonly httpClient: OnCityHttpClient) {}

  async getBySku(skuId: number): Promise<OnCitySkuPrice | null> {
    try {
      const response = await this.httpClient.get<any>(`/api/pricing/prices/${skuId}`);

      return {
        basePrice: response?.basePrice ?? null,
        listPrice: response?.listPrice ?? null
      };
    } catch (error) {
      return null;
    }
  }
}
