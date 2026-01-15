import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MegatoneProductsService } from 'src/app/services/megatone/products/get/MegatoneProductsService';

@ApiTags('megatone')
@Controller('/megatone/products')
export class MegatoneProductsController {
  constructor(private readonly productsService: MegatoneProductsService) {}

  /* ======================================
     LISTAR TODOS LOS PRODUCTOS
     GET /megatone/products
  ====================================== */
  @ApiOperation({ summary: 'Listar todos los productos de Megatone' })
  @Get()
  async listAll(@Query('limit') limit = '50', @Query('offset') offset = '0') {
    const parsedLimit = Math.min(Number(limit) || 50, 100);
    const parsedOffset = Number(offset) || 0;

    return this.productsService.listAll({
      limit: parsedLimit,
      offset: parsedOffset
    });
  }

  /* ======================================
     LISTAR SOLO IDS
     GET /megatone/products/ids
  ====================================== */
  @ApiOperation({ summary: 'Listar todos los IDs de productos de Megatone' })
  @Get('/ids')
  async listIds(@Query('limit') limit = '100', @Query('offset') offset = '0') {
    const parsedLimit = Math.min(Number(limit) || 100, 200);
    const parsedOffset = Number(offset) || 0;

    return this.productsService.listIds({
      limit: parsedLimit,
      offset: parsedOffset
    });
  }

  /* ======================================
     OBTENER UN PRODUCTO
     GET /megatone/products/:publicationId
  ====================================== */
  @ApiOperation({ summary: 'Obtener un producto de Megatone por ID' })
  @Get('/:publicationId')
  async getOne(@Param('publicationId') publicationId: string) {
    const parsedPublicationId = Number(publicationId);

    return this.productsService.getOne(parsedPublicationId);
  }
}
