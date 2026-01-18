import { Injectable } from '@nestjs/common';
import { MegatoneHttpClient } from '../../http/MegatoneHttpClient';
import { MegatoneUpdateStatusPublicacionBulkResponseDto } from 'src/core/entities/megatone/products/update-status/dto/MegatoneUpdateStatusPublicacionBulkResponseDto';
import { MegatoneUpdateStatusPublicacionBulkCommand } from 'src/core/entities/megatone/products/update-status/MegatoneUpdateStatusPublicacionBulkCommand';

@Injectable()
export class MegatoneUpdateStatusRepository {
  private readonly endpoint = '/api/MarketplaceCore/Publicaciones/CambiarEstadoPublicacionBulk';

  constructor(private readonly httpClient: MegatoneHttpClient) {}

  async execute(
    command: MegatoneUpdateStatusPublicacionBulkCommand
  ): Promise<MegatoneUpdateStatusPublicacionBulkResponseDto> {
    const request = {
      cambiarEstadoPublicacionesBulks: command.cambiarEstadoPublicacionesBulks.map(item => ({
        IdPublicaciones: item.IdPublicacion,
        Estados: item.IdEstado
      })),
      IdUser: command.IdUser
    };

    return this.httpClient.put<MegatoneUpdateStatusPublicacionBulkResponseDto>(this.endpoint, request);
  }
}
