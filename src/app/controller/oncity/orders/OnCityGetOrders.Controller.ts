import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OnCityGetOrdersService } from 'src/app/services/oncity/orders/OnCityGetOrdersService';

@ApiTags('oncity')
@Controller('oncity/orders')
export class OnCityGetOrdersController {
  constructor(private readonly ordersService: OnCityGetOrdersService) {}

  @ApiOperation({
    summary: 'Listar órdenes de venta de OnCity'
  })
  @Get()
  async list() {
    return this.ordersService.list();
  }
}
