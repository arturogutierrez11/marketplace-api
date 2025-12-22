import { Module } from '@nestjs/common';
import { MegatoneProductsRepository } from 'src/core/drivers/repositories/megatone/products/get/MegatoneProductsRepository';
import { MegatoneHttpClient } from 'src/core/drivers/repositories/megatone/http/MegatoneHttpClient';
import { MegatoneAuthRepository } from 'src/core/drivers/repositories/megatone/auth/MegatoneAuthRepository';
import { MegatoneProductsService } from 'src/app/services/megatone/products/get/MegatoneProductsService';
import { MegatoneProductsController } from 'src/app/controller/megatone/products/get/MegatoneGetProducts.Controller';
import { InMemoryCacheManager } from 'src/core/drivers/cache/InMemoryCacheManager';
import { MegatoneDeleteProductsController } from 'src/app/controller/megatone/products/delete/MegatoneDeleteProducts.Controller';
import { MegatoneDeleteProductService } from 'src/app/services/megatone/products/delete/MegatoneDeleteProductService';
import { MegatoneDeleteProductsRepository } from 'src/core/drivers/repositories/megatone/products/delete/MegatoneDeleteProductsRepository';
import { MegatoneUpdatePriceStockController } from 'src/app/controller/megatone/products/update/MegatoneUpdatePriceStock.Controller';
import { MegatoneUpdatePriceRepository } from 'src/core/drivers/repositories/megatone/products/update-price/MegatoneUpdatePriceRepository';
import { MegatoneUpdatePriceStockService } from 'src/app/services/megatone/products/update/MegatoneUpdatePriceStockService';
import { MegatonePublishProductsController } from 'src/app/controller/megatone/products/publish/MegatonePublishProducts.Controller';
import { MegatonePublishProductsRepository } from 'src/core/drivers/repositories/megatone/products/publish/MegatonePublishProductsRepository';
import { MegatonePublishProductsService } from 'src/app/services/megatone/products/publish/MegatonePublishProductsService';

@Module({
  controllers: [
    MegatoneProductsController,
    MegatoneDeleteProductsController,
    MegatoneUpdatePriceStockController,
    MegatonePublishProductsController
  ],
  providers: [
    MegatoneProductsService,
    MegatoneDeleteProductService,
    MegatoneUpdatePriceStockService,
    MegatonePublishProductsService,

    {
      provide: 'IMegatonePublishProductsRepository',
      useClass: MegatonePublishProductsRepository
    },

    {
      provide: 'IMegatoneGetProductsRepository',
      useClass: MegatoneProductsRepository
    },
    {
      provide: 'ICacheManager',
      useClass: InMemoryCacheManager
    },
    {
      provide: 'IMegatoneDeleteProductsRepository',
      useClass: MegatoneDeleteProductsRepository
    },
    {
      provide: 'IMegatoneUpdatePriceRepository',
      useClass: MegatoneUpdatePriceRepository
    },

    MegatoneHttpClient,
    MegatoneAuthRepository
  ],
  exports: [MegatoneProductsService]
})
export class MegatoneProductsModule {}
