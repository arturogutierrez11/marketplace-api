import { Injectable, Inject } from '@nestjs/common';
import { IMegatoneUpdatePriceStockRepository } from 'src/core/adapters/repositories/megatone/products/update-price-stock/IMegatoneUpdateStockRepository';
import { MarketplaceBulkUpdateResult } from 'src/core/entities/megatone/products/update/MarketplaceBulkUpdateResult';
import { MegatoneBulkUpdateItemResult } from 'src/core/entities/megatone/products/update/MegatoneBulkUpdateItemResult';
import { MegatoneBulkUpdateStatus } from 'src/core/entities/megatone/products/update/MegatoneBulkUpdateStatus';
import { MegatoneUpdatePriceStockBulkCommand } from 'src/core/entities/megatone/products/update/MegatoneUpdatePriceStockBulkCommand';

@Injectable()
export class MegatoneUpdatePriceStockService {
  constructor(
    @Inject('IMegatoneUpdatePriceStockRepository')
    private readonly updateRepository: IMegatoneUpdatePriceStockRepository
  ) {}

  async bulkUpdate(
    items: {
      publicationId: number;
      precioLista?: number;
      precioPromocional?: number;
      stock?: number;
      alicuotaIva?: number;
      alicuotaImpuestoInterno?: number;
    }[]
  ): Promise<MarketplaceBulkUpdateResult> {
    const payload: MegatoneUpdatePriceStockBulkCommand = {
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
       ✅ SUCCESS
    ========================== */
    for (const pub of response.Publicacion ?? []) {
      results.push({
        publicationId: pub.IdPublicacion,
        priceUpdated: pub.PrecioActualizado,
        stockUpdated: pub.StockActualizado
      });
    }

    /* ==========================
       ❌ ERRORES
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
