import { Injectable, Inject } from '@nestjs/common';
import { IMegatoneDeleteProductsRepository } from 'src/core/adapters/repositories/megatone/products/delete/IMegatoneDeleteProductsRepository';
import { MarketplaceDeleteResult } from 'src/core/entities/megatone/products/delete/MarketplaceDeleteResult';
import { MarketplaceDeleteStatus } from 'src/core/entities/megatone/products/delete/MarketplaceDeleteStatus';

@Injectable()
export class MegatoneDeleteProductService {
  constructor(
    @Inject('IMegatoneDeleteProductsRepository')
    private readonly deleteRepository: IMegatoneDeleteProductsRepository
  ) {}

  async deletePublication(publicationId: number): Promise<MarketplaceDeleteResult> {
    const response = await this.deleteRepository.delete(publicationId);

    if (!response.Errores || response.Errores.length === 0) {
      return {
        publicationId,
        status: MarketplaceDeleteStatus.DELETED
      };
    }

    const errors = response.Errores.map(e => ({
      code: e.Item1,
      message: e.Item2
    }));

    const notFound = errors.some(
      e => e.message.toLowerCase().includes('no existe') || e.message.toLowerCase().includes('no encontrada')
    );

    return {
      publicationId,
      status: notFound ? MarketplaceDeleteStatus.NOT_FOUND : MarketplaceDeleteStatus.FAILED,
      errors
    };
  }
}
