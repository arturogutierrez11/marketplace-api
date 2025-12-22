import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import { IOnCityGetBrandsRepository } from 'src/core/adapters/repositories/oncity/brands/get/IOnCityGetBrandsRepository';
import { OnCityBrand } from 'src/core/entities/oncity/brands/get/OnCityBrand';
import { OnCityBrandPagedResponseDto } from 'src/core/entities/oncity/brands/get/dto/OnCityBrandPagedResponseDto';
import { OnCityBrandMapper } from 'src/core/entities/oncity/brands/get/mapper/OnCityBrandMapper';
import { PaginationParams } from 'src/core/entities/common/Pagination';
import { PaginatedResult } from 'src/core/entities/common/PaginatedResult';

@Injectable()
export class OnCityGetBrandsRepository implements IOnCityGetBrandsRepository {
  constructor(private readonly http: OnCityHttpClient) {}

  async list(params: PaginationParams): Promise<PaginatedResult<OnCityBrand>> {
    const { limit, offset } = params;

    // VTEX usa page, no offset
    const page = Math.floor(offset / limit) + 1;

    const response = await this.http.get<OnCityBrandPagedResponseDto>(
      `/api/catalog_system/pvt/brand/pagedlist?page=${page}&pageSize=${limit}`
    );

    const items = response.items.map(OnCityBrandMapper.toEntity);

    const total = response.paging.total;
    const count = items.length;
    const nextOffset = offset + count < total ? offset + count : null;

    return {
      items,
      total,
      limit,
      offset,
      count,
      hasNext: nextOffset !== null,
      nextOffset
    };
  }
}
