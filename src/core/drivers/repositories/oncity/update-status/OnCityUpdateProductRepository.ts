import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../http/OnCityHttpClient';
import { OnCityUpdateStatusProduct } from 'src/core/entities/oncity/products/update-status/OnCityUpdateStatusProduct';
import { IOnCityUpdateProductRepository } from 'src/core/adapters/repositories/oncity/products/update-status/IOnCityUpdateProductRepository';

@Injectable()
export class OnCityUpdateProductRepository implements IOnCityUpdateProductRepository {
  constructor(private readonly http: OnCityHttpClient) {}

  async update(productId: string, payload: OnCityUpdateStatusProduct) {
    return this.http.put(`/api/catalog-seller-portal/products/${productId}`, {
      ...payload,
      id: productId
    });
  }
}
