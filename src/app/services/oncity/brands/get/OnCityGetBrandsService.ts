import { Injectable, Inject } from '@nestjs/common';
import { IOnCityGetBrandsRepository } from 'src/core/adapters/repositories/oncity/brands/get/IOnCityGetBrandsRepository';
import { PaginationParams } from 'src/core/entities/common/Pagination';
import { OnCityBrand } from 'src/core/entities/oncity/brands/get/OnCityBrand';

@Injectable()
export class OnCityGetBrandsService {
  constructor(
    @Inject('IOnCityGetBrandsRepository')
    private readonly repository: IOnCityGetBrandsRepository
  ) {}

  async list(params: PaginationParams) {
    return this.repository.list(params);
  }
}
