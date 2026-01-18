import { Body, Controller, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MegatoneUpdateStatusService } from 'src/app/services/megatone/products/update-status/MegatoneUpdateStatusService';
import { MarketplaceBulkUpdateResult } from 'src/core/entities/megatone/products/update/MarketplaceBulkUpdateResult';

@ApiTags('megatone')
@ApiBearerAuth()
@Controller('megatone/products')
export class MegatoneUpdateStatusController {
  constructor(private readonly updateStatusService: MegatoneUpdateStatusService) {}

  @Put('status')
  @ApiOperation({
    summary: 'Actualizar estado de publicaciones en Megatone (bulk)',
    description: `
Estados posibles:
- 1 = ACTIVA (requiere stock y reglas válidas)
- 2 = PAUSADA (siempre permitido)
    `
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              publicationId: {
                type: 'number',
                example: 204603
              },
              status: {
                type: 'number',
                example: 1,
                description: '1 = ACTIVA, 2 = PAUSADA'
              }
            },
            required: ['publicationId', 'status']
          },
          example: [
            { publicationId: 204603, status: 1 },
            { publicationId: 204602, status: 2 }
          ]
        },
        userId: {
          type: 'number',
          example: 389
        }
      },
      required: ['items', 'userId']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Resultado del update bulk',
    type: Object
  })
  async bulkUpdateStatus(
    @Body()
    body: {
      items: {
        publicationId: number;
        status: number;
      }[];
      userId: number;
    }
  ): Promise<MarketplaceBulkUpdateResult> {
    return this.updateStatusService.bulkUpdate(body.items, body.userId);
  }
}
