import { Injectable } from '@nestjs/common';
import { MegatoneHttpClient } from '../../http/MegatoneHttpClient';
import { IMegatonePublishProductsRepository } from 'src/core/adapters/repositories/megatone/products/publish/IMegatonePublishProductsRepository';
import { MegatonePublishBulkRequestDto } from 'src/core/entities/megatone/products/publish/dto/MegatonePublishBulkRequestDto';
import { MegatonePublishBulkResponseDto } from 'src/core/entities/megatone/products/publish/dto/MegatonePublishBulkResponseDto';
import { MegatoneSellerContext } from '../../sellerContext/MegatoneSellerContext';

@Injectable()
export class MegatonePublishProductsRepository implements IMegatonePublishProductsRepository {
  private readonly sellerId = MegatoneSellerContext.getSellerId();

  constructor(private readonly http: MegatoneHttpClient) {}

  async publishBulk(payload: MegatonePublishBulkRequestDto): Promise<MegatonePublishBulkResponseDto> {
    return this.http.post('/api/MarketplaceCore/Publicaciones/CreacionMasivaBulk', {
      MasivaBulks: payload.MasivaBulks.map(item => ({
        ...item,
        IdSeller: this.sellerId
      }))
    });
  }
}
