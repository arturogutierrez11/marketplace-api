import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import {
  IOnCityGetPriceBySkuRepository,
  OnCitySkuPrice
} from 'src/core/adapters/repositories/oncity/products/get-price/IOnCityGetPriceBySkuRepository';
import { OnCityHttpError } from '../../http/errors/OnCityHttpError';

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
      /**
       * ⚠️ DEGRADACIÓN ELEGANTE
       *
       * Casos cubiertos:
       * - 429 Too Many Requests
       * - 500 / VTEX saturated
       * - Timeout
       * - Operation was canceled
       *
       * Precio desconocido => null
       * El interactor define fallback (price ?? 0)
       */

      // (opcional) log de diagnóstico
      if (error instanceof OnCityHttpError) {
        console.warn(`[OnCity][PriceFallback] SKU ${skuId} - ${error.errorType}`);
      }

      return null;
    }
  }
}
