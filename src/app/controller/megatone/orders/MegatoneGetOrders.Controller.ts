import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { MegatoneGetOrdersService } from 'src/app/services/megatone/orders/MegatoneGetOrdersService';
import { MegatoneOrder } from 'src/core/entities/megatone/orders/MegatoneOrder';

@ApiTags('megatone')
@Controller('megatone/orders')
export class MegatoneGetOrdersController {
  constructor(private readonly getOrdersService: MegatoneGetOrdersService) {}

  @Get()
  @ApiQuery({
    name: 'fechaDesde',
    required: true,
    type: String,
    format: 'date-time',
    example: '2026-01-01T00:00:00Z',
    description: 'Fecha desde (ISO 8601)'
  })
  @ApiQuery({
    name: 'fechaHasta',
    required: true,
    type: String,
    format: 'date-time',
    example: '2026-01-31T23:59:59Z',
    description: 'Fecha hasta (ISO 8601)'
  })
  async list(
    @Query('fechaDesde') fechaDesde: string,
    @Query('fechaHasta') fechaHasta: string
  ): Promise<MegatoneOrder[]> {
    if (!fechaDesde || !fechaHasta) {
      throw new BadRequestException('fechaDesde y fechaHasta son obligatorios');
    }

    return this.getOrdersService.list({
      fechaDesde,
      fechaHasta
    });
  }
}
