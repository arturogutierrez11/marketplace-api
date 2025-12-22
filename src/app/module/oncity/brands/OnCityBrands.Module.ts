import { Module } from '@nestjs/common';
import { OnCityCreateBrandController } from 'src/app/controller/oncity/brands/create/OnCityCreateBrand.Controller';
import { OnCityGetBrandsController } from 'src/app/controller/oncity/brands/get/OnCityGetBrands.Controller';
import { OnCityCreateBrandService } from 'src/app/services/oncity/brands/create/OnCityCreateBrandService';
import { OnCityGetBrandsService } from 'src/app/services/oncity/brands/get/OnCityGetBrandsService';
import { OnCityCreateBrandRepository } from 'src/core/drivers/repositories/oncity/brands/create/OnCityCreateBrandRepository';
import { OnCityGetBrandsRepository } from 'src/core/drivers/repositories/oncity/brands/get/OnCityGetBrandsRepository';
import { OnCityHttpClient } from 'src/core/drivers/repositories/oncity/http/OnCityHttpClient';

@Module({
  controllers: [OnCityGetBrandsController, OnCityCreateBrandController],
  providers: [
    OnCityGetBrandsService,
    OnCityCreateBrandService,

    {
      provide: 'IOnCityGetBrandsRepository',
      useClass: OnCityGetBrandsRepository
    },
    {
      provide: 'IOnCityCreateBrandRepository',
      useClass: OnCityCreateBrandRepository
    },

    OnCityHttpClient
  ],
  exports: [OnCityGetBrandsService]
})
export class OnCityBrandsModule {}
