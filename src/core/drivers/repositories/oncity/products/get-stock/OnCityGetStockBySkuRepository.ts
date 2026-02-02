import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import {
  IOnCityGetStockBySkuRepository,
  OnCitySkuStock
} from 'src/core/adapters/repositories/oncity/products/get-stock/IOnCityGetStockBySkuRepository';
import { OnCityHttpError } from '../../http/errors/OnCityHttpError';

@Injectable()
export class OnCityGetStockBySkuRepository implements IOnCityGetStockBySkuRepository {
  constructor(private readonly httpClient: OnCityHttpClient) {}

  async getBySku(skuId: number): Promise<OnCitySkuStock> {
    try {
      const response = await this.httpClient.get<any>(`/api/logistics/pvt/inventory/skus/${skuId}`);

      const balance = response?.balance ?? [];

      let total = 0;
      let available = 0;

      for (const warehouse of balance) {
        const totalQty = warehouse.totalQuantity ?? 0;
        const reservedQty = warehouse.reservedQuantity ?? 0;

        total += totalQty;
        available += totalQty - reservedQty;
      }

      return {
        total,
        available
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
       * Stock desconocido => stock 0 => publicación pausada
       * NUNCA rompe el interactor
       */

      // (opcional) log de diagnóstico
      if (error instanceof OnCityHttpError) {
        console.warn(`[OnCity][StockFallback] SKU ${skuId} - ${error.errorType}`);
      }

      return {
        total: 0,
        available: 0
      };
    }
  }
}
