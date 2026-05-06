import { Module } from '@nestjs/common';

/* ----------------------------- Controllers ------------------------------ */
import { OnCityCreateProductController } from 'src/app/controller/oncity/products/create/OnCityCreateProduct.Controller';
import { OnCityUpdateStockController } from 'src/app/controller/oncity/products/update-stock/OnCityUpdateStock.Controller';
import { OnCityUpdatePriceController } from 'src/app/controller/oncity/products/update-price/OnCityUpdatePrice.Controller';
import { OnCityGetProductIdController } from 'src/app/controller/oncity/products/get/OnCityGetProductId.Controller';
import { OnCityGetSkuByIdController } from 'src/app/controller/oncity/products/get/OnCityGetSkuById.Controller';
import { OnCityPublicationsController } from 'src/app/controller/oncity/products/get/GetOnCityPublicationsDetails.Controller';
import { OnCityUpdateProductController } from 'src/app/controller/oncity/products/update-status/OnCityUpdateProduct.Controller';
import { OnCityLocalTokenController } from 'src/app/controller/oncity/auth/OnCityLocalToken.Controller';
import { OnCityUploadImageController } from 'src/app/controller/oncity/products/images/OnCityUploadImage.Controller';

/* ------------------------------- Services ------------------------------- */
import { OnCityCreateProductService } from 'src/app/services/oncity/products/create/OnCityCreateProductService';
import { GetOnCityPublicationsDetailsService } from 'src/app/services/oncity/products/get/GetOnCityPublicationsDetailsService';
import { OnCityUpdateStatusProductService } from 'src/app/services/oncity/products/update-status/OnCityUpdateStatusProductService';
import { OnCityLocalTokenService } from 'src/app/services/oncity/auth/OnCityLocalTokenService';
import { OnCityUploadImageService } from 'src/app/services/oncity/products/images/OnCityUploadImageService';

/* ------------------------------ Interactors ----------------------------- */
import { GetOnCityPublicationsDetails } from 'src/core/interactor/oncity/GetOnCityPublicationsDetails';

/* ----------------------------- Repositories ----------------------------- */
import { OnCityCreateProductRepository } from 'src/core/drivers/repositories/oncity/products/create/OnCityCreateProductRepository';
import { OnCityUpdateStockRepository } from 'src/core/drivers/repositories/oncity/update-stock/OnCityUpdateStockRepository';
import { OnCityUpdatePriceRepository } from 'src/core/drivers/repositories/oncity/update-price/OnCityUpdatePriceRepository';
import { OnCityGetProductIdRepository } from 'src/core/drivers/repositories/oncity/products/get/OnCityGetProductIdRepository';
import { OnCityGetSkuByIdRepository } from 'src/core/drivers/repositories/oncity/products/get/OnCityGetSkuByIdRepository';
import { OnCityGetStockBySkuRepository } from 'src/core/drivers/repositories/oncity/products/get-stock/OnCityGetStockBySkuRepository';

/* ------------------------------ HTTP Client ----------------------------- */
import { OnCityHttpClient } from 'src/core/drivers/repositories/oncity/http/OnCityHttpClient';
import { OnCityGetPriceBySkuRepository } from 'src/core/drivers/repositories/oncity/products/get price/OnCityGetPriceBySkuRepository';
import { OnCityUpdateProductRepository } from 'src/core/drivers/repositories/oncity/update-status/OnCityUpdateProductRepository';
import { OnCityLocalTokenRepository } from 'src/core/drivers/repositories/oncity/auth/OnCityLocalTokenRepository';
import { OnCityUploadImageRepository } from 'src/core/drivers/repositories/oncity/products/images/OnCityUploadImageRepository';

@Module({
  controllers: [
    OnCityCreateProductController,
    OnCityUpdateStockController,
    OnCityUpdatePriceController,
    OnCityGetProductIdController,
    OnCityGetSkuByIdController,
    OnCityPublicationsController,
    OnCityUpdateProductController, // 👈 NUEVO
    OnCityLocalTokenController,
    OnCityUploadImageController
  ],
  providers: [
    /* ----------------------------- Services ----------------------------- */
    OnCityCreateProductService,
    GetOnCityPublicationsDetailsService,
    OnCityUpdateStatusProductService, // 👈 NUEVO
    OnCityLocalTokenService,
    OnCityUploadImageService,

    /* ---------------------------- Interactors --------------------------- */
    GetOnCityPublicationsDetails,

    /* --------------------------- Repositories --------------------------- */
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
    {
      provide: 'IOnCityGetPriceBySkuRepository',
      useClass: OnCityGetPriceBySkuRepository
    },
    {
      provide: 'IOnCityGetStockBySkuRepository',
      useClass: OnCityGetStockBySkuRepository
    },
    {
      provide: 'IOnCityUpdateProductRepository',
      useClass: OnCityUpdateProductRepository
    },
    {
      provide: 'IOnCityLocalTokenRepository',
      useClass: OnCityLocalTokenRepository
    },
    {
      provide: 'IOnCityUploadImageRepository',
      useClass: OnCityUploadImageRepository
    },

    /* --------------------------- HTTP Client ---------------------------- */
    OnCityHttpClient
  ],
  exports: [
    OnCityCreateProductService,
    GetOnCityPublicationsDetailsService,
    OnCityUpdateStatusProductService, // 👈 opcional, pero prolijo
    OnCityLocalTokenService,
    OnCityUploadImageService
  ]
})
export class OnCityProductsModule {}
