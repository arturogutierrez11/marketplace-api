import { Injectable, Inject } from '@nestjs/common';
import { IMegatoneUpdatePriceRepository } from 'src/core/adapters/repositories/megatone/products/update-stock/IMegatoneUpdateStockRepository';
import { MegatoneBulkUpdateItemResult } from 'src/core/entities/megatone/products/update/MegatoneBulkUpdateItemResult';
import { MarketplaceBulkUpdateResult } from 'src/core/entities/megatone/products/update/MegatoneBulkUpdateResult';

import { MegatoneBulkUpdateStatus } from 'src/core/entities/megatone/products/update/MegatoneBulkUpdateStatus';

@Injectable()
export class MegatoneUpdatePriceStockService {
  constructor(
    @Inject('IMegatoneUpdatePriceRepository')
    private readonly updateRepository: IMegatoneUpdatePriceRepository
  ) {}

  async bulkUpdate(
    sellerId: number,
    items: {
      publicationId: number;
      precioLista?: number;
      precioPromocional?: number;
      stock?: number;
      alicuotaIva?: number;
      alicuotaImpuestoInterno?: number;
    }[]
  ): Promise<MarketplaceBulkUpdateResult> {
    const payload = {
      IdUser: sellerId,
      actualizarPrecioYStockBulks: items.map(item => ({
        IdPublicacion: item.publicationId,
        PrecioLista: item.precioLista,
        PrecioPromocional: item.precioPromocional,
        Stock: item.stock,
        AlicuotaIva: item.alicuotaIva,
        AlicuotaImpuestoInterno: item.alicuotaImpuestoInterno
      }))
    };

    const response = await this.updateRepository.bulkUpdatePriceAndStock(payload);

    const results: MegatoneBulkUpdateItemResult[] = [];

    /* ==========================
       ✅ PROCESAR SUCCESS
    ========================== */
    for (const pub of response.Publicacion ?? []) {
      results.push({
        publicationId: pub.IdPublicacion,
        priceUpdated: pub.PrecioActualizado,
        stockUpdated: pub.StockActualizado
      });
    }

    /* ==========================
       ❌ PROCESAR ERRORES
    ========================== */
    for (const err of response.Errors ?? []) {
      results.push({
        publicationId: err.IdPublicacion,
        priceUpdated: false,
        stockUpdated: false,
        errors: [
          {
            target: err.Target,
            message: err.ErrorMesage
          }
        ]
      });
    }

    const total = items.length;
    const success = results.filter(r => r.priceUpdated || r.stockUpdated).length;
    const failed = total - success;

    let status: MegatoneBulkUpdateStatus = MegatoneBulkUpdateStatus.UPDATED;

    if (failed === total) {
      status = MegatoneBulkUpdateStatus.FAILED;
    } else if (failed > 0) {
      status = MegatoneBulkUpdateStatus.PARTIAL;
    }

    return {
      status,
      total,
      success,
      failed,
      items: results
    };
  }
}
