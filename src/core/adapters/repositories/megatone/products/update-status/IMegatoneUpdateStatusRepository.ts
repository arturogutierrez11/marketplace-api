import { MegatoneUpdateStatusPublicacionBulkCommand } from 'src/core/entities/megatone/products/update-status/MegatoneUpdateStatusPublicacionBulkCommand';
import { MegatoneUpdateStatusPublicacionBulkResponseDto } from 'src/core/entities/megatone/products/update-status/dto/MegatoneUpdateStatusPublicacionBulkResponseDto';

export interface IMegatoneUpdateStatusRepository {
  execute(command: MegatoneUpdateStatusPublicacionBulkCommand): Promise<MegatoneUpdateStatusPublicacionBulkResponseDto>;
}
