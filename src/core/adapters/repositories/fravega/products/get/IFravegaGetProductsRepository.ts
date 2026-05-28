import { PaginationParams } from 'src/core/entities/common/Pagination';
import { FravegaProductsPage } from 'src/core/entities/fravega/products/get/FravegaProductsApiResponse';

export interface IFravegaGetProductsRepository {
  list(pagination: PaginationParams): Promise<FravegaProductsPage>;
}
