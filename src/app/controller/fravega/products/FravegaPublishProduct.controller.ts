import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FravegaPublishProductService } from 'src/app/services/fravega/products/publish/FravegaPublishProductService';
import { FravegaPublishProductDto } from './dto/fravega-publish-product.dto';

@ApiTags('fravega')
@Controller('fravega')
export class FravegaPublishProductController {
  constructor(private readonly service: FravegaPublishProductService) {}
  @Post('publish')
  @ApiOperation({
    summary: 'Publicar producto en Fravega'
  })
  @ApiBody({
    type: FravegaPublishProductDto
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta directa de la API de Fravega'
  })
  async publish(@Body() body: FravegaPublishProductDto, @Res() res: Response) {
    console.log('FRAVEGA /publish body.attributes', body.attributes);

    console.log(
      'FRAVEGA /publish attribute types',
      body.attributes?.map(attr => ({
        name: attr.name,
        value: attr.value,
        type: typeof attr.value
      }))
    );

    const result = await this.service.publish(body);

    return res.status(result.status).send(result.data);
  }
}
