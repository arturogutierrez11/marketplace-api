import { Module } from '@nestjs/common';
import { OnCityCreateProductService } from 'src/app/services/oncity/products/create/OnCityCreateProductService';
import { OnCityCreateProductRepository } from 'src/core/drivers/repositories/oncity/products/create/OnCityCreateProductRepository';
import { OnCityHttpClient } from 'src/core/drivers/repositories/oncity/http/OnCityHttpClient';
import { OnCityCreateProductController } from 'src/app/controller/oncity/products/create/OnCityCreateProduct.Controller';
import { OnCityUpdateStockController } from 'src/app/controller/oncity/products/update-stock/OnCityUpdateStock.Controller';
import { OnCityUpdateStockRepository } from 'src/core/drivers/repositories/oncity/update-stock/OnCityUpdateStockRepository';
import { OnCityUpdatePriceRepository } from 'src/core/drivers/repositories/oncity/update-price/OnCityUpdatePriceRepository';
import { OnCityUpdatePriceController } from 'src/app/controller/oncity/products/update-price/OnCityUpdatePrice.Controller';
import { OnCityGetProductIdController } from 'src/app/controller/oncity/products/get/OnCityGetProductId.Controller';
import { OnCityGetProductIdRepository } from 'src/core/drivers/repositories/oncity/products/get/OnCityGetProductIdRepository';
import { OnCityGetSkuByIdRepository } from 'src/core/drivers/repositories/oncity/products/get/OnCityGetSkuByIdRepository';
import { OnCityGetSkuByIdController } from 'src/app/controller/oncity/products/get/OnCityGetSkuById.Controller';

@Module({
  controllers: [
    OnCityCreateProductController,
    OnCityUpdateStockController,
    OnCityUpdatePriceController,
    OnCityGetProductIdController,
    OnCityGetSkuByIdController
  ],
  providers: [
    OnCityCreateProductService,
    {
      provide: 'IOnCityCreateProductRepository',
      useClass: OnCityCreateProductRepository
    },
    {
      provide: 'IOnCityUpdateStockRepository',
      useClass: OnCityUpdateStockRepository
    },
    {
      provide: 'IOnCityUpdatePriceRepository',
      useClass: OnCityUpdatePriceRepository
    },
    {
      provide: 'IOnCityGetProductIdRepository',
      useClass: OnCityGetProductIdRepository
    },
    {
      provide: 'IOnCityGetSkuByIdRepository',
      useClass: OnCityGetSkuByIdRepository
    },
    OnCityHttpClient
  ],
  exports: [OnCityCreateProductService]
})
export class OnCityProductsModule {}
