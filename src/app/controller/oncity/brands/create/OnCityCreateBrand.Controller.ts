import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

import { OnCityCreateBrandService } from 'src/app/services/oncity/brands/create/OnCityCreateBrandService';
import { CreateOnCityBrandDto } from './dto/CreateBrandDto';

@ApiTags('oncity')
@Controller('oncity/brands')
export class OnCityCreateBrandController {
  constructor(private readonly service: OnCityCreateBrandService) {}

  @ApiOperation({ summary: 'Crear marca en OnCity (VTEX)' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['Name', 'Text', 'Keywords', 'SiteTitle', 'LinkId', 'Active', 'MenuHome'],
      properties: {
        Id: { type: 'number', example: 2000003 },
        Name: { type: 'string', example: 'Adidas' },
        Text: { type: 'string', example: 'Adidas' },
        Keywords: { type: 'string', example: 'adidas' },
        SiteTitle: { type: 'string', example: 'Adidas' },
        LinkId: { type: 'string', example: 'adidas-sports' },
        Score: { type: 'number', example: 10 },
        MenuHome: { type: 'boolean', example: true },
        Active: { type: 'boolean', example: true }
      }
    }
  })
  @Post()
  create(@Body() body: CreateOnCityBrandDto) {
    return this.service.create(body);
  }
}
