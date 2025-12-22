import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MegatoneProductsService } from 'src/app/services/megatone/products/get/MegatoneProductsService';

@ApiTags('megatone')
@Controller('/megatone/products')
export class MegatoneProductsController {
  constructor(private readonly productsService: MegatoneProductsService) {}

  /* ======================================
     LISTAR TODOS LOS PRODUCTOS
     GET /marketplace/megatone/products
  ====================================== */
  @ApiOperation({ summary: 'Listar Todos los productos de Megatone' })
  @Get()
  async listAll(@Query('sellerId') sellerId: string, @Query('limit') limit = '50', @Query('offset') offset = '0') {
    const parsedSellerId = Number(sellerId);
    const parsedLimit = Math.min(Number(limit) || 50, 100);
    const parsedOffset = Number(offset) || 0;

    return this.productsService.listAll(parsedSellerId, {
      limit: parsedLimit,
      offset: parsedOffset
    });
  }

  /* ======================================
     LISTAR SOLO IDS
     GET /marketplace/megatone/products/ids
  ====================================== */
  @ApiOperation({ summary: 'Listar Todos los ID de los productos de Megatone' })
  @Get('/ids')
  async listIds(@Query('sellerId') sellerId: string, @Query('limit') limit = '100', @Query('offset') offset = '0') {
    const parsedSellerId = Number(sellerId);
    const parsedLimit = Math.min(Number(limit) || 100, 200);
    const parsedOffset = Number(offset) || 0;

    return this.productsService.listIds(parsedSellerId, {
      limit: parsedLimit,
      offset: parsedOffset
    });
  }

  /* ======================================
     OBTENER UN PRODUCTO
     GET /marketplace/megatone/products/:publicationId
  ====================================== */
  @ApiOperation({ summary: 'Listar un producto de Megatone por ID' })
  @Get('/:publicationId')
  async getOne(@Param('publicationId') publicationId: string, @Query('sellerId') sellerId: string) {
    const parsedSellerId = Number(sellerId);
    const parsedPublicationId = Number(publicationId);

    return this.productsService.getOne(parsedSellerId, parsedPublicationId);
  }
}
