import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { OnCityGetOrdersService } from 'src/app/services/oncity/orders/OnCityGetOrdersService';

@ApiTags('oncity')
@Controller('oncity/orders')
export class OnCityGetOrdersController {
  constructor(private readonly ordersService: OnCityGetOrdersService) {}

  @ApiOperation({
    summary: 'Listar órdenes de venta de OnCity',
    description: `
Devuelve las órdenes de venta de OnCity filtradas por fecha de creación.

⚠️ IMPORTANTE:
El endpoint de VTEX OMS requiere fechas en **formato ISO completo**.

Ejemplo válido:
\`\`\`
2026-02-03T00:00:00.000Z
\`\`\`

El filtro interno que se envía a VTEX es:
\`\`\`
creationDate:[fechaDesde TO fechaHasta]
\`\`\`
`
  })
  @ApiQuery({
    name: 'fechaDesde',
    required: true,
    description: 'Fecha ISO desde la cual buscar órdenes (inclusive)',
    example: '2026-02-03T00:00:00.000Z'
  })
  @ApiQuery({
    name: 'fechaHasta',
    required: true,
    description: 'Fecha ISO hasta la cual buscar órdenes (inclusive)',
    example: '2026-02-03T23:59:59.999Z'
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros de fecha inválidos'
  })
  @Get()
  async execute(@Query('fechaDesde') fechaDesde: string, @Query('fechaHasta') fechaHasta: string) {
    return this.ordersService.execute({
      fechaDesde,
      fechaHasta
    });
  }
}
