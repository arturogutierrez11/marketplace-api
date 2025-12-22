import { Injectable } from '@nestjs/common';
import { MegatoneHttpClient } from '../../http/MegatoneHttpClient';
import { IMegatoneDeleteProductsRepository } from 'src/core/adapters/repositories/megatone/products/delete/IMegatoneDeleteProductsRepository';
import { MegatoneResponseDto } from 'src/core/entities/megatone/products/delete/dto/MegatoneResponseDto';

@Injectable()
export class MegatoneDeleteProductsRepository implements IMegatoneDeleteProductsRepository {
  constructor(private readonly http: MegatoneHttpClient) {}

  async delete(sellerId: number, publicationId: number): Promise<MegatoneResponseDto> {
    return this.http.delete<MegatoneResponseDto>(`/api/MarketplaceCore/Publicaciones/${publicationId}`, {
      params: {
        IdSeller: sellerId
      }
    });
  }
}
