import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetOnCityPublicationsDetailsService } from 'src/app/services/oncity/products/get/GetOnCityPublicationsDetailsService';

@ApiTags('oncity')
@Controller('oncity/products/all')
export class OnCityPublicationsController {
  constructor(private readonly publicationsService: GetOnCityPublicationsDetailsService) {}

  @Get()
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({
    description: 'Listado paginado de todas las publicaciones en OnCity con detalles'
  })
  @ApiOperation({
    summary: 'Obtener detalle de todos los SKU',
    description: 'Devuelve poca información de todos los SKU'
  })
  async getPublications(@Query('offset') offset = '0', @Query('limit') limit = '10') {
    return this.publicationsService.getPublications({
      offset: Number(offset),
      limit: Number(limit)
    });
  }
}
