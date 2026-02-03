import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MegatoneProductsModule } from './module/megatone/products/MegatoneProducts.Module';
import { OnCityOrdersModule } from './module/oncity/orders/OncityOrders.Module';
import { OnCityBrandsModule } from './module/oncity/brands/OnCityBrands.Module';
import { OnCityProductsModule } from './module/oncity/products/OncityProducts.Module';
import { MegatoneOrdersModule } from './module/megatone/orders/MegatoneOrders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MegatoneProductsModule,
    OnCityOrdersModule,
    OnCityBrandsModule,
    OnCityProductsModule,
    MegatoneOrdersModule
  ]
})
export class AppModule {}
