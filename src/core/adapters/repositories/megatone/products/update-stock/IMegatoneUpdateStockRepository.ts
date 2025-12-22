import { MegatoneUpdatePriceStockBulkRequestDto } from 'src/core/entities/megatone/products/update/dto/MegatoneUpdatePriceStockBulkRequestDto';
import { MegatoneUpdatePriceStockBulkResponseDto } from 'src/core/entities/megatone/products/update/dto/MegatoneUpdatePriceStockBulkResponseDto';

export interface IMegatoneUpdatePriceRepository {
  bulkUpdatePriceAndStock(
    payload: MegatoneUpdatePriceStockBulkRequestDto
  ): Promise<MegatoneUpdatePriceStockBulkResponseDto>;
}
