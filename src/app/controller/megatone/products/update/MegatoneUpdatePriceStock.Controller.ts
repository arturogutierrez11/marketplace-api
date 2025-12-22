import { Controller, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { MegatoneUpdatePriceStockService } from 'src/app/services/megatone/products/update/MegatoneUpdatePriceStockService';

@ApiTags('megatone')
@Controller('megatone/products')
export class MegatoneUpdatePriceStockController {
  constructor(private readonly updateService: MegatoneUpdatePriceStockService) {}

  @ApiOperation({
    summary: 'Actualizar precio y stock de publicaciones en Megatone (bulk)'
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['items'],
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            required: ['publicationId'],
            properties: {
              publicationId: {
                type: 'number',
                example: 155562
              },
              precioLista: {
                type: 'number',
                example: 120000
              },
              precioPromocional: {
                type: 'number',
                example: 110000
              },
              stock: {
                type: 'number',
                example: 5
              },
              alicuotaIva: {
                type: 'number',
                example: 21
              },
              alicuotaImpuestoInterno: {
                type: 'number',
                example: 0
              }
            }
          }
        }
      }
    }
  })
  @Post('update')
  async bulkUpdate(
    @Query('sellerId') sellerIdRaw: string,
    @Body()
    body: {
      items: {
        publicationId: number;
        precioLista?: number;
        precioPromocional?: number;
        stock?: number;
        alicuotaIva?: number;
        alicuotaImpuestoInterno?: number;
      }[];
    }
  ) {
    const sellerId = Number(sellerIdRaw);

    /* ==========================
       VALIDACIONES QUERY
    ========================== */
    if (!sellerId || Number.isNaN(sellerId)) {
      throw new BadRequestException('sellerId inválido');
    }

    /* ==========================
       VALIDACIONES BODY
    ========================== */
    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      throw new BadRequestException('Debe enviarse un array de items');
    }

    for (const item of body.items) {
      if (!item.publicationId) {
        throw new BadRequestException('Cada item debe tener publicationId');
      }

      const hasData =
        item.precioLista !== undefined || item.precioPromocional !== undefined || item.stock !== undefined;

      if (!hasData) {
        throw new BadRequestException(`El item ${item.publicationId} no tiene datos para actualizar`);
      }
    }

    return this.updateService.bulkUpdate(sellerId, body.items);
  }
}
