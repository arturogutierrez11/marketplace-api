import { MegatonePublishBulkRequestDto } from 'src/core/entities/megatone/products/publish/dto/MegatonePublishBulkRequestDto';

import { MegatonePublishBulkResponseDto } from 'src/core/entities/megatone/products/publish/dto/MegatonePublishBulkResponseDto';

export interface IMegatonePublishProductsRepository {
  publishBulk(payload: MegatonePublishBulkRequestDto): Promise<MegatonePublishBulkResponseDto>;
}
