import { MegatoneGetProductsResponseDto } from 'src/core/entities/megatone/products/get/dto/MegatoneProductsResponseDto';
import { MarketplaceProduct } from 'src/core/entities/megatone/products/get/MarketplaceProduct';
import { MegatoneProductMapper } from './mappers/MegatoneProductMapper';
import { PaginationParams } from 'src/core/entities/common/Pagination';
import { MarketplacePublicationId } from 'src/core/entities/megatone/products/get/MarketplacePublicationId';
import { PaginatedResult } from 'src/core/entities/common/PaginatedResult';
import { IMegatoneGetProductsRepository } from 'src/core/adapters/repositories/megatone/products/get/IMegatoneGetProductsRepository';
import { MegatoneSellerContext } from '../../sellerContext/MegatoneSellerContext';
import { MegatoneHttpClient } from '../../http/MegatoneHttpClient';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MegatoneProductsRepository implements IMegatoneGetProductsRepository {
  private readonly sellerId = MegatoneSellerContext.getSellerId();

  constructor(private readonly http: MegatoneHttpClient) {}

  /* ======================================
     LIST ALL
  ====================================== */
  async listAll(pagination: PaginationParams): Promise<PaginatedResult<MarketplaceProduct>> {
    const page = Math.floor(pagination.offset / pagination.limit) + 1;

    const response = await this.http.get<MegatoneGetProductsResponseDto>('/api/MarketplaceCore/Publicaciones', {
      params: {
        IdSeller: this.sellerId,
        Pagina: page,
        Cantidad: pagination.limit
      }
    });

    return {
      items: response.Content.map(MegatoneProductMapper.toEntity),
      total: response.Total,
      limit: pagination.limit,
      offset: pagination.offset,
      count: response.Content.length,
      hasNext: page < response.TotalPages,
      nextOffset: page < response.TotalPages ? pagination.offset + pagination.limit : null
    };
  }

  /* ======================================
     LIST IDS
  ====================================== */
  async listIds(pagination: PaginationParams): Promise<PaginatedResult<MarketplacePublicationId>> {
    const page = Math.floor(pagination.offset / pagination.limit) + 1;

    const response = await this.http.get<MegatoneGetProductsResponseDto>('/api/MarketplaceCore/Publicaciones', {
      params: {
        IdSeller: this.sellerId,
        Pagina: page,
        Cantidad: pagination.limit
      }
    });

    return {
      items: response.Content.map(item => ({
        publicationId: item.IdPublicacion,
        sellerSku: item.SkuSeller
      })),
      total: response.Total,
      limit: pagination.limit,
      offset: pagination.offset,
      count: response.Content.length,
      hasNext: page < response.TotalPages,
      nextOffset: page < response.TotalPages ? pagination.offset + pagination.limit : null
    };
  }

  /* ======================================
     GET ONE
  ====================================== */
  async getOne(publicationId: number): Promise<MarketplaceProduct | null> {
    const response = await this.http.get<MegatoneGetProductsResponseDto>('/api/MarketplaceCore/Publicaciones', {
      params: {
        IdSeller: this.sellerId,
        IdPublicacion: publicationId,
        Pagina: 1,
        Cantidad: 1
      }
    });

    const item = response.Content?.[0];
    if (!item) return null;

    return MegatoneProductMapper.toEntity(item);
  }
}
