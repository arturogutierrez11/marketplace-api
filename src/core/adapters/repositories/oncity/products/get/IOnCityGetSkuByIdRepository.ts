import { OnCityGetSkuByIdResponse } from 'src/core/entities/oncity/products/get/OnCityGetSkuByIdResponse';

export interface IOnCityGetSkuByIdRepository {
  execute(skuId: number): Promise<OnCityGetSkuByIdResponse>;
  executeRaw(skuId: number): Promise<any>;
}
