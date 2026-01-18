import { Injectable, Inject } from '@nestjs/common';
import { IMegatoneUpdateStatusRepository } from 'src/core/adapters/repositories/megatone/products/update-status/IMegatoneUpdateStatusRepository';
import { MegatoneUpdateStatusPublicacionBulkCommand } from 'src/core/entities/megatone/products/update-status/MegatoneUpdateStatusPublicacionBulkCommand';
import { MarketplaceBulkUpdateResult } from 'src/core/entities/megatone/products/update/MarketplaceBulkUpdateResult';
import { MegatoneBulkUpdateStatus } from 'src/core/entities/megatone/products/update/MegatoneBulkUpdateStatus';

@Injectable()
export class MegatoneUpdateStatusService {
  constructor(
    @Inject('IMegatoneUpdateStatusPublicacionRepository')
    private readonly updateRepository: IMegatoneUpdateStatusRepository
  ) {}

  async bulkUpdate(
    items: { publicationId: number; status: number }[],
    userId: number
  ): Promise<MarketplaceBulkUpdateResult> {
    const payload: MegatoneUpdateStatusPublicacionBulkCommand = {
      cambiarEstadoPublicacionesBulks: items.map(item => ({
        IdPublicacion: item.publicationId,
        IdEstado: item.status
      })),
      IdUser: userId
    };

    const response = await this.updateRepository.execute(payload);

    const total = items.length;
    const failed = response.Errores?.length ?? 0;
    const success = total - failed;

    let status: MegatoneBulkUpdateStatus = MegatoneBulkUpdateStatus.UPDATED;

    if (failed === total) {
      status = MegatoneBulkUpdateStatus.FAILED;
    } else if (failed > 0) {
      status = MegatoneBulkUpdateStatus.PARTIAL;
    }

    return {
      status,
      total,
      success,
      failed,
      items: []
    };
  }
}
