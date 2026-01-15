import { Inject, Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/entities/common/Pagination';
import { PaginatedResult } from 'src/core/entities/common/PaginatedResult';
import { MarketplaceProduct } from 'src/core/entities/megatone/products/get/MarketplaceProduct';
import { MarketplacePublicationId } from 'src/core/entities/megatone/products/get/MarketplacePublicationId';
import { IMegatoneGetProductsRepository } from 'src/core/adapters/repositories/megatone/products/get/IMegatoneGetProductsRepository';

@Injectable()
export class MegatoneProductsService {
  constructor(
    @Inject('IMegatoneGetProductsRepository')
    private readonly productsRepository: IMegatoneGetProductsRepository
  ) {}

  /* ======================================
     LISTAR TODOS LOS PRODUCTOS
  ====================================== */
  async listAll(pagination: PaginationParams): Promise<PaginatedResult<MarketplaceProduct>> {
    return this.productsRepository.listAll(pagination);
  }

  /* ======================================
     LISTAR SOLO IDS
  ====================================== */
  async listIds(pagination: PaginationParams): Promise<PaginatedResult<MarketplacePublicationId>> {
    return this.productsRepository.listIds(pagination);
  }

  /* ======================================
     OBTENER UN PRODUCTO
  ====================================== */
  async getOne(publicationId: number): Promise<MarketplaceProduct | null> {
    return this.productsRepository.getOne(publicationId);
  }
}
