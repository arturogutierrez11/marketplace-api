import { Body, Controller, HttpCode, HttpStatus, Post, Inject } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IOnCityUpdatePriceRepository } from 'src/core/adapters/repositories/oncity/products/update-price/IOnCityUpdatePriceRepository';
import { UpdateOnCityPriceDto } from './dto/UpdateOnCityPriceDto';

@ApiTags('oncity')
@Controller('oncity/price')
export class OnCityUpdatePriceController {
  constructor(
    @Inject('IOnCityUpdatePriceRepository')
    private readonly updatePriceRepository: IOnCityUpdatePriceRepository
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar precio de un SKU en VTEX (OnCity)'
  })
  @ApiBody({ type: UpdateOnCityPriceDto })
  @ApiResponse({ status: 200, description: 'Precio actualizado correctamente' })
  async updatePrice(@Body() body: UpdateOnCityPriceDto): Promise<void> {
    await this.updatePriceRepository.execute({
      skuId: body.skuId,
      listPrice: body.listPrice,
      costPrice: body.costPrice,
      markup: body.markup
    });
  }
}
