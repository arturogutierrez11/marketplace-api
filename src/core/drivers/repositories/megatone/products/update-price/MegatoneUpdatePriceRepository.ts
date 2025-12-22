import { Injectable } from '@nestjs/common';
import { MegatoneHttpClient } from '../../http/MegatoneHttpClient';
import { MegatoneUpdatePriceStockBulkRequestDto } from 'src/core/entities/megatone/products/update/dto/MegatoneUpdatePriceStockBulkRequestDto';
import { MegatoneUpdatePriceStockBulkResponseDto } from 'src/core/entities/megatone/products/update/dto/MegatoneUpdatePriceStockBulkResponseDto';
import { IMegatoneUpdatePriceRepository } from 'src/core/adapters/repositories/megatone/products/update-stock/IMegatoneUpdateStockRepository';

@Injectable()
export class MegatoneUpdatePriceRepository implements IMegatoneUpdatePriceRepository {
  constructor(private readonly http: MegatoneHttpClient) {}

  async bulkUpdatePriceAndStock(
    payload: MegatoneUpdatePriceStockBulkRequestDto
  ): Promise<MegatoneUpdatePriceStockBulkResponseDto> {
    return this.http.put('/api/MarketplaceCore/Publicaciones/ActualizacionMasivaPrecioYStockBulk', payload);
  }
}
