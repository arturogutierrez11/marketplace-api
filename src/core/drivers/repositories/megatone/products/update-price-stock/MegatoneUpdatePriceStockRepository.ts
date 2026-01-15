import { Injectable } from '@nestjs/common';
import { MegatoneHttpClient } from '../../http/MegatoneHttpClient';
import { MegatoneUpdatePriceStockBulkRequestDto } from 'src/core/entities/megatone/products/update/dto/MegatoneUpdatePriceStockBulkRequestDto';
import { MegatoneUpdatePriceStockBulkResponseDto } from 'src/core/entities/megatone/products/update/dto/MegatoneUpdatePriceStockBulkResponseDto';
import { IMegatoneUpdatePriceStockRepository } from 'src/core/adapters/repositories/megatone/products/update-price-stock/IMegatoneUpdateStockRepository';
import { MegatoneSellerContext } from '../../sellerContext/MegatoneSellerContext';
import { MegatoneUpdatePriceStockBulkCommand } from 'src/core/entities/megatone/products/update/MegatoneUpdatePriceStockBulkCommand';

@Injectable()
export class MegatoneUpdatePriceStockRepository implements IMegatoneUpdatePriceStockRepository {
  private readonly sellerId = MegatoneSellerContext.getSellerId();

  constructor(private readonly http: MegatoneHttpClient) {}

  async bulkUpdatePriceAndStock(
    payload: MegatoneUpdatePriceStockBulkCommand
  ): Promise<MegatoneUpdatePriceStockBulkResponseDto> {
    const finalPayload: MegatoneUpdatePriceStockBulkRequestDto = {
      IdUser: this.sellerId,
      actualizarPrecioYStockBulks: payload.actualizarPrecioYStockBulks
    };

    return this.http.put('/api/MarketplaceCore/Publicaciones/ActualizacionMasivaPrecioYStockBulk', finalPayload);
  }
}
