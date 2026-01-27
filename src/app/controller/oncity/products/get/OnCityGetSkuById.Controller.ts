import { Controller, Get, Param, HttpCode, HttpStatus, Inject, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IOnCityGetSkuByIdRepository } from 'src/core/adapters/repositories/oncity/products/get/IOnCityGetSkuByIdRepository';
import { OnCityGetSkuByIdResponse } from 'src/core/entities/oncity/products/get/OnCityGetSkuByIdResponse';
import { OnCityGetSkuByIdRawResponse } from 'src/core/entities/oncity/products/get/OnCityGetSkuByIdRawResponse';

@ApiTags('oncity')
@Controller('oncity/sku')
export class OnCityGetSkuByIdController {
  constructor(
    @Inject('IOnCityGetSkuByIdRepository')
    private readonly repository: IOnCityGetSkuByIdRepository
  ) {}

  @Get(':skuId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener detalle de un SKU por skuId',
    description: 'Devuelve poca información del SKU'
  })
  @ApiParam({
    name: 'skuId',
    example: 413,
    description: 'ID interno del SKU en VTEX'
  })
  @ApiResponse({
    status: 200,
    description: 'Detalle del SKU',
    example: {
      skuId: 413,
      productId: 413,
      refId: 'B0CZ5RYBWW',
      ean: 'B0CZ5RYBWW',
      name: 'Estación De Energía Portátil Dji Power 1000',
      brand: 'DJI',
      isActive: false
    }
  })
  @ApiResponse({
    status: 400,
    description: 'skuId inválido'
  })
  async getSkuById(@Param('skuId') skuId: string): Promise<OnCityGetSkuByIdResponse> {
    const parsedSkuId = Number(skuId);

    if (Number.isNaN(parsedSkuId)) {
      throw new BadRequestException('skuId must be a number');
    }

    return this.repository.execute(parsedSkuId);
  }

  @Get(':skuId/raw')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener detalle completo de un SKU',
    description: 'Devuelve el payload completo de VTEX sin transformaciones'
  })
  @ApiParam({
    name: 'skuId',
    example: 413,
    description: 'ID interno del SKU en VTEX'
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta RAW de VTEX'
  })
  @ApiResponse({
    status: 400,
    description: 'skuId inválido'
  })
  async getSkuByIdRaw(@Param('skuId') skuId: string): Promise<OnCityGetSkuByIdRawResponse> {
    const parsedSkuId = Number(skuId);

    if (Number.isNaN(parsedSkuId)) {
      throw new BadRequestException('skuId must be a number');
    }

    return this.repository.executeRaw(parsedSkuId);
  }
}
