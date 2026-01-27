import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import { IOnCityCreateProductRepository } from 'src/core/adapters/repositories/oncity/products/create/IOnCityCreateProductRepository';
import { CreateOnCityProductRequestDto } from 'src/app/controller/oncity/products/create/dto/CreateOnCityProductRequest.dto';

@Injectable()
export class OnCityCreateProductRepository implements IOnCityCreateProductRepository {
  constructor(private readonly http: OnCityHttpClient) {}

  async create(payload: CreateOnCityProductRequestDto): Promise<any> {
    return this.http.post('/api/catalog-seller-portal/products', payload);
  }
}
