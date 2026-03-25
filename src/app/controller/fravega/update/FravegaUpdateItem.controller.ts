import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FravegaUpdateItemService } from 'src/app/services/fravega/update/FravegaUpdateItemService';
import { UpdateFravegaAttributesDto } from './dto/UpdateFravegaAttributes.dto';
import { UpdateFravegaItemDto, UpdateFravegaItemFullDocDto } from './dto/UpdateFravegaItem.dto';
import { FravegaUpdatedItem } from 'src/core/entities/fravega/update/FravegaUpdatedItem';

@ApiTags('fravega')
@Controller('fravega/update')
export class FravegaUpdateItemController {
  constructor(private readonly service: FravegaUpdateItemService) {}

  @Put('Id/:id')
  @ApiOperation({ summary: 'Actualizar item de Fravega por id. Actualmente solo admite images.' })
  @ApiParam({ name: 'id', description: 'Id del item en Fravega' })
  @ApiBody({
    type: UpdateFravegaItemFullDocDto,
    description: 'Schema completo esperado por Fravega para update de item'
  })
  async updateById(@Param('id') id: string, @Body() body: UpdateFravegaItemDto): Promise<FravegaUpdatedItem> {
    return this.service.byId(id, body);
  }

  @Put('refeId/:refId')
  @ApiOperation({ summary: 'Actualizar item de Fravega por refId. Actualmente solo admite images.' })
  @ApiParam({ name: 'refId', description: 'RefId / SKU del item' })
  @ApiBody({
    type: UpdateFravegaItemFullDocDto,
    description: 'Schema completo esperado por Fravega para update de item'
  })
  async updateByRefId(
    @Param('refId') refId: string,
    @Body() body: UpdateFravegaItemDto
  ): Promise<FravegaUpdatedItem> {
    return this.service.byRefId(refId, body);
  }

  @Put('refeId/:refId/attributes')
  @ApiOperation({ summary: 'Actualizar atributos de item de Fravega por refId' })
  @ApiParam({ name: 'refId', description: 'RefId / SKU del item' })
  async updateAttributesByRefId(
    @Param('refId') refId: string,
    @Body() body: UpdateFravegaAttributesDto
  ): Promise<FravegaUpdatedItem> {
    return this.service.attributesByRefId(refId, body);
  }
}
