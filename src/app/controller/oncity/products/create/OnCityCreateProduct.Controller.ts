import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateOnCityProductRequestDto } from './dto/CreateOnCityProductRequest.dto';
import { OnCityCreateProductService } from 'src/app/services/oncity/products/create/OnCityCreateProductService';

@ApiTags('oncity')
@Controller('oncity/products')
export class OnCityCreateProductController {
  constructor(private readonly service: OnCityCreateProductService) {}

  @ApiOperation({
    summary: 'Crear producto en OnCity (VTEX)',
    description: `
Este endpoint permite crear productos en VTEX (OnCity).

### Modos soportados

#### 🔹 Tipo 1 – Crear producto con categoría y marca nuevas
Debe enviar:
- CategoryPath
- BrandName

#### 🔹 Tipo 2 – Crear producto con categoría y marca existentes
Debe enviar:
- CategoryId
- BrandId

⚠️ No se pueden mezclar ambos tipos.
`
  })
  @ApiBody({
    description: 'Payload para crear un producto en VTEX',
    schema: {
      type: 'object',
      required: ['Name'],
      properties: {
        Id: {
          type: 'number',
          example: 42,
          description: 'ID opcional del producto. Si no se envía, VTEX lo genera.'
        },
        Name: {
          type: 'string',
          example: 'Black T-Shirt',
          description: 'Nombre del producto (máx 150 caracteres)'
        },

        /* =====================
           CATEGORÍA
        ===================== */
        CategoryPath: {
          type: 'string',
          example: 'Mens/Clothing/T-Shirts',
          description: 'Ruta de categoría (usar SOLO si no se envía CategoryId)'
        },
        CategoryId: {
          type: 'number',
          example: 302,
          description: 'ID de categoría existente (usar SOLO si no se envía CategoryPath)'
        },

        DepartmentId: {
          type: 'number',
          example: 1,
          description: 'ID del departamento'
        },

        /* =====================
           MARCA
        ===================== */
        BrandName: {
          type: 'string',
          example: 'Adidas',
          description: 'Nombre de la marca (usar SOLO si no se envía BrandId)'
        },
        BrandId: {
          type: 'number',
          example: 2000003,
          description: 'ID de marca existente (usar SOLO si no se envía BrandName)'
        },

        RefId: {
          type: 'string',
          example: 'REF-TSHIRT-001',
          description: 'Código de referencia del producto'
        },

        Title: {
          type: 'string',
          example: 'Premium Black T-Shirt',
          description: 'Título SEO del producto'
        },

        LinkId: {
          type: 'string',
          example: 'black-tshirt',
          description: 'Slug del producto (URL)'
        },

        Description: {
          type: 'string',
          example: 'A classic black t-shirt made from cotton',
          description: 'Descripción completa del producto'
        },

        DescriptionShort: {
          type: 'string',
          example: 'Premium cotton t-shirt',
          description: 'Descripción corta'
        },

        ReleaseDate: {
          type: 'string',
          example: '2025-07-01T00:00:00',
          description: 'Fecha de lanzamiento'
        },

        IsVisible: {
          type: 'boolean',
          example: true,
          description: 'Visible en la tienda'
        },

        IsActive: {
          type: 'boolean',
          example: true,
          description: 'Producto activo'
        },

        TaxCode: {
          type: 'string',
          example: '12345',
          description: 'Código impositivo'
        },

        MetaTagDescription: {
          type: 'string',
          example: 'Very cool t-shirt for sports',
          description: 'Meta description SEO'
        },

        ShowWithoutStock: {
          type: 'boolean',
          example: true,
          description: 'Permitir mostrar sin stock'
        },

        Score: {
          type: 'number',
          example: 1,
          description: 'Prioridad en resultados de búsqueda'
        }
      }
    }
  })
  @Post()
  async create(@Body() body: CreateOnCityProductRequestDto) {
    /* =====================
       VALIDACIONES
    ===================== */
    if (!body.CategoryPath && !body.CategoryId) {
      throw new BadRequestException('Debe enviar CategoryPath o CategoryId');
    }

    if (!body.BrandName && !body.BrandId) {
      throw new BadRequestException('Debe enviar BrandName o BrandId');
    }

    if (body.CategoryPath && body.CategoryId) {
      throw new BadRequestException('No puede enviar CategoryPath y CategoryId juntos');
    }

    if (body.BrandName && body.BrandId) {
      throw new BadRequestException('No puede enviar BrandName y BrandId juntos');
    }

    return this.service.create(body);
  }
}
