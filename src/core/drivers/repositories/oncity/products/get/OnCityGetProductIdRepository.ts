import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import { OnCityGetProductId } from 'src/core/entities/oncity/products/get/OnCityGetProductId';
import { OnCityHttpError } from '../../http/errors/OnCityHttpError';
import { IOnCityGetProductIdRepository } from 'src/core/adapters/repositories/oncity/products/get/IOnCityGetProductIdRepository';

@Injectable()
export class OnCityGetProductIdRepository implements IOnCityGetProductIdRepository {
  constructor(private readonly httpClient: OnCityHttpClient) {}

  async execute(from: number, to: number): Promise<OnCityGetProductId> {
    const url = `/api/catalog_system/pvt/products/GetProductAndSkuIds` + `?_from=${from}&_to=${to}`;

    return this.httpClient.get<OnCityGetProductId>(url);
  }
}
