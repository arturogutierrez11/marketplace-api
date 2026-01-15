import { MegatoneUpdatePriceStockBulkItemDto } from './dto/MegatoneUpdatePriceStockBulkRequestDto';

export interface MegatoneUpdatePriceStockBulkCommand {
  actualizarPrecioYStockBulks: MegatoneUpdatePriceStockBulkItemDto[];
}
