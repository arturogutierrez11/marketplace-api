import { Controller, Get, Query, HttpCode, HttpStatus, Inject, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IOnCityGetProductIdRepository } from 'src/core/adapters/repositories/oncity/products/get/IOnCityGetProductIdRepository';
import { OnCityGetProductId } from 'src/core/entities/oncity/products/get/OnCityGetProductId';

@ApiTags('oncity')
@Controller('oncity/products/ids')
export class OnCityGetProductIdController {
  constructor(
    @Inject('IOnCityGetProductIdRepository')
    private readonly onCityGetProductId: IOnCityGetProductIdRepository
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener ProductIds y SkuIds desde VTEX',
    description: 'Devuelve un mapa ProductId → SkuIds, con paginado obligatorio (_from, _to)'
  })
  @ApiQuery({
    name: '_from',
    description: 'Índice inicial del paginado',
    example: 0,
    required: true
  })
  @ApiQuery({
    name: '_to',
    description: 'Índice final del paginado',
    example: 49,
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de ProductIds y SkuIds obtenido correctamente',
    example: {
      data: {
        '2062': [2062],
        '1352': [1352]
      },
      range: {
        total: 2167,
        from: 0,
        to: 49
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Faltan o son inválidos los parámetros _from / _to'
  })
  async getProductIds(@Query('_from') from?: string, @Query('_to') to?: string): Promise<OnCityGetProductId> {
    if (from === undefined || to === undefined) {
      throw new BadRequestException('Query params _from and _to are required');
    }

    const fromNumber = Number(from);
    const toNumber = Number(to);

    if (Number.isNaN(fromNumber) || Number.isNaN(toNumber)) {
      throw new BadRequestException('Query params _from and _to must be numbers');
    }

    return this.onCityGetProductId.execute(fromNumber, toNumber);
  }
}
