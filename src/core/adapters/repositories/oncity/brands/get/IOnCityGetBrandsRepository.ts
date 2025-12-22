import { PaginatedResult } from 'src/core/entities/common/PaginatedResult';
import { PaginationParams } from 'src/core/entities/common/Pagination';
import { OnCityBrand } from 'src/core/entities/oncity/brands/get/OnCityBrand';

export interface IOnCityGetBrandsRepository {
  list(params: PaginationParams): Promise<PaginatedResult<OnCityBrand>>;
}
