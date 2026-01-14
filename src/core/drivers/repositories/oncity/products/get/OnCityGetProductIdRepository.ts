import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import { OnCityGetProductId } from 'src/core/entities/oncity/products/get/OnCityGetProductId';
import { OnCityHttpError } from '../../http/errors/OnCityHttpError';

@Injectable()
export class OnCityGetProductIdRepository {
  constructor(private readonly httpClient: OnCityHttpClient) {}

  async execute(from: number, to: number): Promise<OnCityGetProductId> {
    const url = `https://${process.env.ONCITY_ACCOUNT}.myvtex.com/api/catalog_system/pvt/products/GetProductAndSkuIds?_from=${from}&_to=${to}`;

    try {
      return await this.httpClient.get<OnCityGetProductId>(url);
    } catch (error) {
      throw new OnCityHttpError(500, error, 'Error getting product and sku ids from OnCity');
    }
  }
}
