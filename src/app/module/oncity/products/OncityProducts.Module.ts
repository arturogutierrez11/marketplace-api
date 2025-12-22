import { Module } from '@nestjs/common';
import { OnCityCreateProductService } from 'src/app/services/oncity/products/create/OnCityCreateProductService';
import { OnCityCreateProductRepository } from 'src/core/drivers/repositories/oncity/products/create/OnCityCreateProductRepository';
import { OnCityHttpClient } from 'src/core/drivers/repositories/oncity/http/OnCityHttpClient';
import { OnCityCreateProductController } from 'src/app/controller/oncity/products/create/OnCityCreateProduct.Controller';

@Module({
  controllers: [OnCityCreateProductController],
  providers: [
    OnCityCreateProductService,
    {
      provide: 'IOnCityCreateProductRepository',
      useClass: OnCityCreateProductRepository
    },
    OnCityHttpClient
  ],
  exports: [OnCityCreateProductService]
})
export class OnCityProductsModule {}
