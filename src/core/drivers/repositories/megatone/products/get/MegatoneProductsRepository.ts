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
import { MegatoneProductDto } from 'src/core/entities/megatone/products/get/dto/MegatoneProductDto';
import { Logger } from '../../../../logger/Logger';

@Injectable()
export class MegatoneProductsRepository implements IMegatoneGetProductsRepository {
  private readonly sellerId = MegatoneSellerContext.getSellerId();

  constructor(private readonly http: MegatoneHttpClient) {}

  /* ======================================
     LIST ALL
  ====================================== */
  async listAll(pagination: PaginationParams): Promise<PaginatedResult<MarketplaceProduct>> {
    return this.listSlice(pagination, item => MegatoneProductMapper.toEntity(item));
  }


  /* ======================================
     LIST IDS
  ====================================== */
  async listIds(pagination: PaginationParams): Promise<PaginatedResult<MarketplacePublicationId>> {
    return this.listSlice(pagination, item => ({
        publicationId: item.IdPublicacion,
        sellerSku: item.SkuSeller
      }));
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

    const item = this.getContent(response)[0];
    if (!item) return null;

    return MegatoneProductMapper.toEntity(item);
  }

  private async listSlice<T>(
    pagination: PaginationParams,
    mapItem: (item: MegatoneProductDto) => T
  ): Promise<PaginatedResult<T>> {
    const logicalPage = Math.max(pagination.offset, 1);
    const response = await this.fetchLogicalPage(logicalPage, pagination.limit);
    const content = this.getContent(response);
    const physicalPage = this.toPhysicalPage(logicalPage);
    const total = response.Total;
    const totalPages = Math.ceil(total / pagination.limit);
    const items = content.map(mapItem);
    const count = items.length;
    const nextOffset = logicalPage < totalPages ? logicalPage + 1 : null;

    Logger.info(
      `[MEGATONE PRODUCTS PAGINATION] start ${JSON.stringify({
        offset: logicalPage,
        limit: pagination.limit,
        logicalPage,
        physicalPage
      })}`
    );

    if (content.length === 0) {
      Logger.warn(
        `[MEGATONE PRODUCTS PAGINATION] empty-upstream-page ${JSON.stringify({
          offset: logicalPage,
          logicalPage,
          physicalPage,
          limit: pagination.limit,
          total
        })}`
      );
    }

    Logger.info(
      `[MEGATONE PRODUCTS PAGINATION] result ${JSON.stringify({
        offset: logicalPage,
        limit: pagination.limit,
        logicalPage,
        physicalPage,
        responseTotal: response.Total,
        responseTotalPages: response.TotalPages,
        responsePage: response.Page,
        responsePageSize: response.PageSize,
        count,
        total,
        hasNext: nextOffset !== null,
        nextOffset
      })}`
    );

    return {
      items,
      total,
      limit: pagination.limit,
      offset: logicalPage,
      count,
      hasNext: nextOffset !== null,
      nextOffset
    };
  }

  private async fetchLogicalPage(logicalPage: number, limit: number): Promise<MegatoneGetProductsResponseDto> {
    const physicalPage = this.toPhysicalPage(logicalPage);

    return this.http.get<MegatoneGetProductsResponseDto>('/api/MarketplaceCore/Publicaciones', {
      params: {
        IdSeller: this.sellerId,
        Pagina: physicalPage,
        Cantidad: limit
      }
    });
  }

  private toPhysicalPage(logicalPage: number): number {
    return logicalPage + Math.floor(logicalPage / 2);
  }

  private getContent(response: MegatoneGetProductsResponseDto): MegatoneProductDto[] {
    return Array.isArray(response.Content) ? response.Content : [];
  }
}
