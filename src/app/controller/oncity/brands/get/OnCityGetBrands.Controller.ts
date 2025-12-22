import { Controller, Get, Query, DefaultValuePipe, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { OnCityGetBrandsService } from 'src/app/services/oncity/brands/get/OnCityGetBrandsService';

@ApiTags('oncity')
@Controller('oncity/brands')
export class OnCityGetBrandsController {
  constructor(private readonly service: OnCityGetBrandsService) {}

  @ApiOperation({ summary: 'Listar marcas de OnCity (VTEX)' })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @Get()
  async list(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number
  ) {
    const MAX_LIMIT = 20;

    if (limit < 1) {
      throw new BadRequestException('limit debe ser >= 1');
    }

    if (offset < 0) {
      throw new BadRequestException('offset debe ser >= 0');
    }

    return this.service.list({
      limit: Math.min(limit, MAX_LIMIT),
      offset
    });
  }
}
