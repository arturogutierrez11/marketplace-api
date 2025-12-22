import { Module } from '@nestjs/common';
import { OnCityGetOrdersController } from 'src/app/controller/oncity/orders/OnCityGetOrders.Controller';
import { OnCityGetOrdersService } from 'src/app/services/oncity/orders/OnCityGetOrdersService';
import { OnCityHttpClient } from 'src/core/drivers/repositories/oncity/http/OnCityHttpClient';
import { OnCityGetOrdersRepository } from 'src/core/drivers/repositories/oncity/orders/OnCityGetOrdersRepository';

@Module({
  controllers: [OnCityGetOrdersController],
  providers: [
    OnCityGetOrdersService,
    {
      provide: 'IOnCityGetOrdersRepository',
      useClass: OnCityGetOrdersRepository
    },
    OnCityHttpClient
  ],
  exports: [OnCityGetOrdersService]
})
export class OnCityOrdersModule {}
