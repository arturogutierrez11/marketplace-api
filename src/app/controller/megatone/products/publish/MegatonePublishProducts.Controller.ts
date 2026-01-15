import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

import { MegatonePublishProductsService } from 'src/app/services/megatone/products/publish/MegatonePublishProductsService';
import { MegatonePublishBulkRequestDto } from 'src/core/entities/megatone/products/publish/dto/MegatonePublishBulkRequestDto';

@ApiTags('megatone')
@Controller('megatone/products')
export class MegatonePublishProductsController {
  constructor(private readonly publishService: MegatonePublishProductsService) {}

  @ApiOperation({ summary: 'Publicar productos en Megatone (bulk)' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['MasivaBulks'],
      properties: {
        MasivaBulks: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: [
              'Titulo',
              'Categoria',
              'Marca',
              'SkuSeller',
              'PrecioLista',
              'Stock',
              'Imagenes',
              'Dimensiones',
              'EnvioGratisZona'
            ],
            properties: {
              Titulo: { type: 'string', example: 'Producto ejemplo' },
              DescripcionAmpliada: { type: 'string', example: 'Descripción del producto' },
              Categoria: { type: 'number', example: 302 },
              Marca: { type: 'number', example: 5774 },
              SkuSeller: { type: 'string', example: 'SKU-TEST-001' },

              PrecioLista: { type: 'number', example: 150000 },
              PrecioPromocional: { type: 'number', example: 140000 },
              Stock: { type: 'number', example: 5 },

              TipoEntrega: { type: 'number', example: 1 },
              EnvioGratis: { type: 'boolean', example: true },
              EnvioPropio: { type: 'boolean', example: false },

              EnvioGratisZona: {
                type: 'object',
                required: ['Amba', 'Interior', 'Patagonia', 'EnvioGratis'],
                properties: {
                  Amba: { type: 'boolean', example: true },
                  Interior: { type: 'boolean', example: true },
                  Patagonia: { type: 'boolean', example: true },
                  EnvioGratis: { type: 'boolean', example: true }
                }
              },

              Dimensiones: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'object',
                  required: ['Alto', 'Ancho', 'Profundidad', 'Peso'],
                  properties: {
                    Alto: { type: 'number', example: 10 },
                    Ancho: { type: 'number', example: 10 },
                    Profundidad: { type: 'number', example: 10 },
                    Peso: { type: 'number', example: 1 }
                  }
                }
              },

              IdTipoPublicacion: { type: 'number', example: 99 },
              IdMoneda: { type: 'number', example: 1 },
              AlicuotaIva: { type: 'number', example: 21 },
              AlicuotaImpuestoInterno: { type: 'number', example: 0 },

              GarantiaExtActiva: { type: 'boolean', example: false },
              GarantiaFabrica: { type: 'number', example: 0 },

              Imagenes: {
                type: 'array',
                minItems: 1,
                maxItems: 6,
                items: {
                  type: 'object',
                  required: ['Posicion', 'UrlImagen'],
                  properties: {
                    Posicion: { type: 'number', example: 1 },
                    UrlImagen: {
                      type: 'string',
                      example: 'https://via.placeholder.com/500'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  @Post('publish')
  async publishBulk(@Body() body: MegatonePublishBulkRequestDto) {
    if (!body?.MasivaBulks || !Array.isArray(body.MasivaBulks) || body.MasivaBulks.length === 0) {
      throw new BadRequestException('MasivaBulks debe ser un array con al menos un item');
    }

    for (const item of body.MasivaBulks) {
      if (!item.SkuSeller) {
        throw new BadRequestException('Cada item debe tener SkuSeller');
      }

      if (!item.Categoria || !item.Marca) {
        throw new BadRequestException(`SKU ${item.SkuSeller} sin categoría o marca`);
      }

      if (!item.Imagenes || item.Imagenes.length === 0) {
        throw new BadRequestException(`SKU ${item.SkuSeller} sin imágenes`);
      }

      if (!item.Dimensiones || item.Dimensiones.length === 0) {
        throw new BadRequestException(`SKU ${item.SkuSeller} sin dimensiones`);
      }

      if (!item.EnvioGratisZona) {
        throw new BadRequestException(`SKU ${item.SkuSeller} sin EnvioGratisZona`);
      }
    }

    return this.publishService.publishBulk(body);
  }
}
