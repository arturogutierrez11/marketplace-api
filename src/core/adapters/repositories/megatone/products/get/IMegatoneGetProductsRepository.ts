import { PaginatedResult } from 'src/core/entities/common/PaginatedResult';
import { PaginationParams } from 'src/core/entities/common/Pagination';
import { MarketplaceProduct } from 'src/core/entities/megatone/products/get/MarketplaceProduct';
import { MarketplacePublicationId } from 'src/core/entities/megatone/products/get/MarketplacePublicationId';

export interface IMegatoneGetProductsRepository {
  listAll(sellerId: number, pagination: PaginationParams): Promise<PaginatedResult<MarketplaceProduct>>;

  listIds(sellerId: number, pagination: PaginationParams): Promise<PaginatedResult<MarketplacePublicationId>>;

  getOne(sellerId: number, publicationId: number): Promise<MarketplaceProduct | null>;
}
