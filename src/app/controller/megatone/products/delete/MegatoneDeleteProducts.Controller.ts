import { Controller, Delete, Param, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MegatoneDeleteProductService } from 'src/app/services/megatone/products/delete/MegatoneDeleteProductService';
import { MarketplaceDeleteResult } from 'src/core/entities/megatone/products/delete/MarketplaceDeleteResult';

@ApiTags('megatone')
@Controller('megatone/products')
export class MegatoneDeleteProductsController {
  constructor(private readonly deleteService: MegatoneDeleteProductService) {}

  @ApiOperation({
    summary: 'Eliminar una publicación de Megatone',
    description:
      'Elimina una publicación por IdPublicacion. Si la publicación no existe, no rompe el sistema y devuelve estado NOT_FOUND.'
  })
  @ApiParam({
    name: 'publicationId',
    type: Number,
    description: 'ID de la publicación en Megatone',
    example: 155562
  })
  @ApiQuery({
    name: 'sellerId',
    type: Number,
    required: true,
    description: 'ID del seller en Megatone',
    example: 389
  })
  @ApiResponse({
    status: 200,
    description: 'Resultado de la eliminación',
    schema: {
      example: {
        publicationId: 155562,
        status: 'DELETED'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos'
  })
  @Delete(':publicationId')
  async deleteOne(
    @Param('publicationId', ParseIntPipe) publicationId: number,
    @Query('sellerId', ParseIntPipe) sellerId: number
  ): Promise<MarketplaceDeleteResult> {
    if (!sellerId || !publicationId) {
      throw new BadRequestException('sellerId y publicationId son obligatorios');
    }

    return this.deleteService.deletePublication(sellerId, publicationId);
  }
}
