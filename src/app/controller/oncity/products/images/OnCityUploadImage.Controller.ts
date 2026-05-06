import { Controller, HttpCode, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OnCityUploadImageService } from 'src/app/services/oncity/products/images/OnCityUploadImageService';

@ApiTags('oncity')
@Controller('oncity/images')
export class OnCityUploadImageController {
  constructor(private readonly uploadImageService: OnCityUploadImageService) {}

  @Post(':sku')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Subir imagen de catálogo a VTEX (OnCity)',
    description: 'Genera el token local de VTEX y sube la imagen a vtex.catalog-images usando el SKU como nombre base.'
  })
  @ApiParam({
    name: 'sku',
    example: 'TEST-001-01',
    description: 'SKU usado para generar el nombre final de la imagen en VTEX.'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: ['file']
    }
  })
  @ApiResponse({ status: 200, description: 'Imagen subida correctamente a VTEX.' })
  async uploadImage(@Param('sku') sku: string, @UploadedFile() file: any) {
    return this.uploadImageService.execute({
      sku,
      file
    });
  }
}
