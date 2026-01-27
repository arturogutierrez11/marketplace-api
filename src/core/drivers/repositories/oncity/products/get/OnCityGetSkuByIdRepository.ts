import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import { OnCityGetSkuByIdResponse } from 'src/core/entities/oncity/products/get/OnCityGetSkuByIdResponse';
import { OnCityGetSkuByIdRawResponse } from 'src/core/entities/oncity/products/get/OnCityGetSkuByIdRawResponse';
import { IOnCityGetSkuByIdRepository } from 'src/core/adapters/repositories/oncity/products/get/IOnCityGetSkuByIdRepository';

@Injectable()
export class OnCityGetSkuByIdRepository implements IOnCityGetSkuByIdRepository {
  constructor(private readonly httpClient: OnCityHttpClient) {}

  async execute(skuId: number): Promise<OnCityGetSkuByIdResponse> {
    const url = `https://${process.env.ONCITY_ACCOUNT}.myvtex.com/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`;

    const response = await this.httpClient.get<any>(url);

    return {
      skuId: response.Id,
      productId: response.ProductId,
      refId: response.AlternateIds?.RefId ?? null,
      ean: response.AlternateIds?.Ean ?? null,
      name: response.NameComplete,
      brand: response.BrandName,
      isActive: response.IsActive,
      DetailUrl: `https://www.oncity.com${response.DetailUrl}`
    };
  }

  async executeRaw(skuId: number): Promise<OnCityGetSkuByIdRawResponse> {
    const url = `https://${process.env.ONCITY_ACCOUNT}.myvtex.com/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`;

    return this.httpClient.get<OnCityGetSkuByIdRawResponse>(url);
  }
}
