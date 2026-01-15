import { MegatoneUpdatePriceStockBulkItemDto } from 'src/core/entities/megatone/products/update/dto/MegatoneUpdatePriceStockBulkRequestDto';
import { MegatoneUpdatePriceStockBulkResponseDto } from 'src/core/entities/megatone/products/update/dto/MegatoneUpdatePriceStockBulkResponseDto';

export interface IMegatoneUpdatePriceStockRepository {
  bulkUpdatePriceAndStock(payload: {
    actualizarPrecioYStockBulks: MegatoneUpdatePriceStockBulkItemDto[];
  }): Promise<MegatoneUpdatePriceStockBulkResponseDto>;
}
