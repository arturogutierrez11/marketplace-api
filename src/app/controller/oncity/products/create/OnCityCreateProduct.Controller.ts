import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateOnCityProductRequestDto } from './dto/CreateOnCityProductRequest.dto';
import { OnCityCreateProductService } from 'src/app/services/oncity/products/create/OnCityCreateProductService';

@ApiTags('oncity')
@Controller('oncity/products')
export class OnCityCreateProductController {
  constructor(private readonly service: OnCityCreateProductService) {}

  @ApiOperation({
    summary: 'Crear producto en OnCity (VTEX Seller Portal)',
    description: `
Crea un producto completo usando la API **VTEX Seller Portal**.

Incluye:
- Producto
- Categorías
- Marca
- Imágenes
- SKUs
- Dimensiones

⚠️ Requiere permisos de **Seller Portal** en la API Key.
`
  })
  @ApiBody({
    description: 'Payload alternativo para crear producto en VTEX Seller Portal',
    schema: {
      type: 'object',
      required: [
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
        externalId: {
          type: 'string',
          example: 'ALT-TSHIRT-002',
          description: 'ID externo único del producto'
        },
        status: {
          type: 'string',
          enum: ['active', 'inactive'],
          example: 'active',
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
          description: 'Descripción completa del producto'
        },
        brandId: {
          type: 'string',
          example: '3105',
          description: 'ID de marca existente en VTEX'
        },
        categoryIds: {
          type: 'array',
          items: { type: 'string' },
          example: ['102', '527'],
          description: 'IDs de categorías asociadas'
        },
        specs: {
          type: 'array',
          example: [],
          description: 'Especificaciones del producto (opcional)'
        },
        attributes: {
          type: 'array',
          example: [],
          description: 'Atributos del producto (opcional)'
        },
        slug: {
          type: 'string',
          example: '/remera-basica-algodon',
          description: 'Slug / URL del producto (único)'
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
                  'https://tiendaloquieroaca924.vtexassets.com/assets/vtex.catalog-images/products/examplePhoneImageBlue.png',
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
          description: 'Lista de SKUs del producto',
          items: {
            type: 'object',
            required: ['externalId', 'name', 'ean', 'isActive', 'weight', 'dimensions', 'images'],
            properties: {
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
                description: 'Peso del SKU (kg)'
              },
              dimensions: {
                type: 'object',
                required: ['width', 'height', 'length'],
                properties: {
                  width: {
                    type: 'number',
                    example: 30
                  },
                  height: {
                    type: 'number',
                    example: 2
                  },
                  length: {
                    type: 'number',
                    example: 40
                  }
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
          description: 'Identificador del seller / origen'
        }
      }
    }
  })
  @Post()
  async create(@Body() body: CreateOnCityProductRequestDto) {
    return this.service.create(body);
  }
}
