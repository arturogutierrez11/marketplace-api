import { Controller, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UpdateOnCityProductRequestDto } from './dto/UpdateStatusOnCityProductRequestDto';
import { OnCityUpdateStatusProductService } from 'src/app/services/oncity/products/update-status/OnCityUpdateStatusProductService';

@ApiTags('oncity')
@Controller('oncity/products')
export class OnCityUpdateProductController {
  constructor(private readonly service: OnCityUpdateStatusProductService) {}

  @ApiOperation({
    summary: 'Actualizar estado (active / inactive) de un producto en OnCity',
    description: `
Actualiza un producto existente en VTEX Seller Portal.

⚠️ Reglas importantes:
- El productId del path debe ser el ID numérico del producto
- El body debe ser COMPLETO
- El body debe incluir id + externalId
- Los SKUs deben incluir su id
- VTEX NO acepta updates parciales
`
  })
  @ApiBody({
    description: 'Payload completo requerido por VTEX Seller Portal para actualizar un producto',
    schema: {
      type: 'object',
      required: [
        'id',
        'externalId',
        'status',
        'name',
        'description',
        'brandId',
        'categoryIds',
        'slug',
        'images',
        'skus',
        'origin'
      ],
      properties: {
        id: {
          type: 'string',
          example: '2173',
          description: 'ID numérico del producto (debe coincidir con el path)'
        },
        externalId: {
          type: 'string',
          example: 'ALT-TSHIRT-002',
          description: 'ID externo del producto'
        },
        status: {
          type: 'string',
          enum: ['active', 'inactive'],
          example: 'inactive',
          description: 'Estado del producto'
        },
        name: {
          type: 'string',
          example: 'Remera Básica Algodón',
          description: 'Nombre del producto'
        },
        description: {
          type: 'string',
          example: 'Remera básica de algodón, ideal para uso diario',
          description: 'Descripción del producto'
        },
        brandId: {
          type: 'string',
          example: '3105',
          description: 'ID de la marca existente en VTEX'
        },
        categoryIds: {
          type: 'array',
          items: { type: 'string' },
          example: ['102'],
          description: 'IDs de categorías del producto'
        },
        specs: {
          type: 'array',
          example: [],
          description: 'Especificaciones del producto'
        },
        attributes: {
          type: 'array',
          example: [],
          description: 'Atributos del producto'
        },
        slug: {
          type: 'string',
          example: 'remera-basica-algodon',
          description: 'Slug / URL del producto'
        },
        images: {
          type: 'array',
          description: 'Imágenes del producto',
          items: {
            type: 'object',
            required: ['id', 'url'],
            properties: {
              id: {
                type: 'string',
                example: 'remera-algodon-front.jpg',
                description: 'ID lógico de la imagen'
              },
              url: {
                type: 'string',
                example:
                  'https://tiendaloquieroaca924.vtexassets.com/assets/vtex.catalog-images/products/remera-algodon-front___hash.jpg',
                description: 'URL pública del asset'
              },
              alt: {
                type: 'string',
                example: 'Remera básica de algodón',
                description: 'Texto alternativo'
              }
            }
          }
        },
        skus: {
          type: 'array',
          description: 'SKUs asociados al producto (OBLIGATORIOS)',
          items: {
            type: 'object',
            required: ['id', 'externalId', 'name', 'ean', 'isActive', 'weight', 'dimensions', 'images'],
            properties: {
              id: {
                type: 'string',
                example: '2173',
                description: 'ID numérico del SKU'
              },
              externalId: {
                type: 'string',
                example: 'ALT-TSHIRT-002-S',
                description: 'ID externo del SKU'
              },
              name: {
                type: 'string',
                example: 'Remera Básica Algodón - Talle S',
                description: 'Nombre del SKU'
              },
              ean: {
                type: 'string',
                example: '7791234567890',
                description: 'Código EAN'
              },
              isActive: {
                type: 'boolean',
                example: true,
                description: 'SKU activo'
              },
              weight: {
                type: 'number',
                example: 0.3,
                description: 'Peso del SKU'
              },
              dimensions: {
                type: 'object',
                required: ['width', 'height', 'length'],
                properties: {
                  width: { type: 'number', example: 30 },
                  height: { type: 'number', example: 2 },
                  length: { type: 'number', example: 40 }
                }
              },
              specs: {
                type: 'array',
                example: [],
                description: 'Especificaciones del SKU'
              },
              images: {
                type: 'array',
                items: { type: 'string' },
                example: ['remera-algodon-front.jpg'],
                description: 'IDs de imágenes asociadas al SKU'
              }
            }
          }
        },
        origin: {
          type: 'string',
          example: 'tiendaloquieroaca924',
          description: 'Identificador del seller'
        }
      }
    }
  })
  @Put(':productId')
  async updateProduct(@Param('productId') productId: string, @Body() body: UpdateOnCityProductRequestDto) {
    return this.service.update(productId, body);
  }
}
