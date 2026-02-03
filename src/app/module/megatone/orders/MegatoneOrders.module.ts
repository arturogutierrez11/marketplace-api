import { Module } from '@nestjs/common';
import { MegatoneGetOrdersController } from 'src/app/controller/megatone/orders/MegatoneGetOrders.Controller';
import { MegatoneGetOrdersService } from 'src/app/services/megatone/orders/MegatoneGetOrdersService';
import { InMemoryCacheManager } from 'src/core/drivers/cache/InMemoryCacheManager';
import { MegatoneAuthRepository } from 'src/core/drivers/repositories/megatone/auth/MegatoneAuthRepository';
import { MegatoneHttpClient } from 'src/core/drivers/repositories/megatone/http/MegatoneHttpClient';
import { MegatoneGetOrdersRepository } from 'src/core/drivers/repositories/megatone/orders/MegatoneGetOrdersRepository';

@Module({
  controllers: [MegatoneGetOrdersController],
  providers: [
    MegatoneGetOrdersService,
    {
      provide: 'IMegatoneGetOrdersRepository',
      useClass: MegatoneGetOrdersRepository
    },
    {
      provide: 'ICacheManager',
      useClass: InMemoryCacheManager
    },

    MegatoneHttpClient,
    MegatoneAuthRepository
  ],
  exports: [MegatoneGetOrdersService]
})
export class MegatoneOrdersModule {}
