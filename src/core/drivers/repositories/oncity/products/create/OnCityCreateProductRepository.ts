import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import { IOnCityCreateProductRepository } from 'src/core/adapters/repositories/oncity/products/create/IOnCityCreateProductRepository';
import { CreateOnCityProductRequestDto } from 'src/app/controller/oncity/products/create/dto/CreateOnCityProductRequest.dto';
import { OnCityCreateProductResponseDto } from 'src/core/entities/oncity/products/create/dto/OnCityCreateProductResponseDto';
import { OnCityProduct } from 'src/core/entities/oncity/products/create/OnCityProduct';
import { OnCityProductMapper } from 'src/core/entities/oncity/products/create/mapper/OnCityProductMapper';

@Injectable()
export class OnCityCreateProductRepository implements IOnCityCreateProductRepository {
  constructor(private readonly http: OnCityHttpClient) {}

  async create(payload: CreateOnCityProductRequestDto): Promise<OnCityProduct> {
    const response = await this.http.post<OnCityCreateProductResponseDto>('/api/catalog/pvt/product', payload);

    return OnCityProductMapper.toEntity(response);
  }
}
