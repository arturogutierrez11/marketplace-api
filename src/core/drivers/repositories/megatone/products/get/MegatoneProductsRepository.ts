import { Injectable } from '@nestjs/common';
import { MegatoneHttpClient } from '../../http/MegatoneHttpClient';
import { IMegatoneGetProductsRepository } from 'src/core/adapters/repositories/megatone/products/get/IMegatoneGetProductsRepository';
import { PaginatedResult } from 'src/core/entities/common/PaginatedResult';
import { PaginationParams } from 'src/core/entities/common/Pagination';
import { MarketplaceProduct } from 'src/core/entities/megatone/products/get/MarketplaceProduct';
import { MarketplacePublicationId } from 'src/core/entities/megatone/products/get/MarketplacePublicationId';
import { MegatoneGetProductsResponseDto } from 'src/core/entities/megatone/products/get/dto/MegatoneProductsResponseDto';
import { MegatoneProductMapper } from './mappers/MegatoneProductMapper';
import { MegatoneSellerContext } from '../../sellerContext/MegatoneSellerContext';

@Injectable()
export class MegatoneProductsRepository implements IMegatoneGetProductsRepository {
  private readonly sellerId = MegatoneSellerContext.getSellerId();

  constructor(private readonly http: MegatoneHttpClient) {}

  async listAll(pagination: PaginationParams): Promise<PaginatedResult<MarketplaceProduct>> {
    const page = Math.floor(pagination.offset / pagination.limit) + 1;

    const response = await this.http.get<MegatoneGetProductsResponseDto>('/api/MarketplaceCore/Publicaciones', {
      params: {
        IdSeller: this.sellerId,
        NumeroPagina: page,
        CantidadPagina: pagination.limit
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

  async listIds(pagination: PaginationParams): Promise<PaginatedResult<MarketplacePublicationId>> {
    const page = Math.floor(pagination.offset / pagination.limit) + 1;

    const response = await this.http.get<MegatoneGetProductsResponseDto>('/api/MarketplaceCore/Publicaciones', {
      params: {
        IdSeller: this.sellerId,
        NumeroPagina: page,
        CantidadPagina: pagination.limit
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

  async getOne(publicationId: number): Promise<MarketplaceProduct | null> {
    const response = await this.http.get<MegatoneGetProductsResponseDto>('/api/MarketplaceCore/Publicaciones', {
      params: {
        IdSeller: this.sellerId,
        NumeroPagina: 1,
        CantidadPagina: 1,
        IdPublicacion: publicationId
      }
    });

    const item = response.Content?.[0];
    if (!item) return null;

    return MegatoneProductMapper.toEntity(item);
  }
}
