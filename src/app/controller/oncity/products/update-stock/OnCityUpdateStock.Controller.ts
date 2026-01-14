import { Body, Controller, HttpCode, HttpStatus, Post, Inject } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateOnCityStockDto } from './dto/UpdateOnCityStockDto';
import { IOnCityUpdateStockRepository } from 'src/core/adapters/repositories/oncity/products/update-stock/IOnCityUpdateStockRepository';

@ApiTags('oncity')
@Controller('oncity/stock')
export class OnCityUpdateStockController {
  constructor(
    @Inject('IOnCityUpdateStockRepository')
    private readonly updateStockRepository: IOnCityUpdateStockRepository
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar stock de un SKU en VTEX (OnCity)',
    description: 'Setea el stock de un SKU específico en VTEX utilizando el SKU ID interno y la cantidad indicada.'
  })
  @ApiBody({
    type: UpdateOnCityStockDto,
    description: 'Datos necesarios para actualizar el stock'
  })
  @ApiResponse({
    status: 200,
    description: 'Stock actualizado correctamente',
    schema: {
      example: true
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos enviados en el body'
  })
  @ApiResponse({
    status: 500,
    description: 'Error al comunicarse con VTEX / OnCity'
  })
  async updateStock(@Body() body: UpdateOnCityStockDto): Promise<boolean> {
    return this.updateStockRepository.execute({
      skuId: body.skuId,
      quantity: body.quantity
    });
  }
}
