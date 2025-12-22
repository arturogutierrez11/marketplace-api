import { Injectable, Inject } from '@nestjs/common';

import { IMegatonePublishProductsRepository } from 'src/core/adapters/repositories/megatone/products/publish/IMegatonePublishProductsRepository';

import { MegatonePublishBulkRequestDto } from 'src/core/entities/megatone/products/publish/dto/MegatonePublishBulkRequestDto';

import { MarketplacePublishResult } from 'src/core/entities/megatone/products/publish/MarketplacePublishResult';

import { MarketplacePublishItemResult } from 'src/core/entities/megatone/products/publish/MarketplacePublishItemResult';

import { MarketplacePublishStatus } from 'src/core/entities/megatone/products/publish/MarketplacePublishStatus';

@Injectable()
export class MegatonePublishProductsService {
  constructor(
    @Inject('IMegatonePublishProductsRepository')
    private readonly publishRepository: IMegatonePublishProductsRepository
  ) {}

  async publishBulk(sellerId: number, body: MegatonePublishBulkRequestDto): Promise<MarketplacePublishResult> {
    /* ============================
       🧱 ARMAR PAYLOAD FINAL
    ============================ */
    const payload: MegatonePublishBulkRequestDto = {
      MasivaBulks: body.MasivaBulks.map(item => ({
        ...item,
        IdSeller: sellerId
      }))
    };

    const response = await this.publishRepository.publishBulk(payload);

    const results: MarketplacePublishItemResult[] = [];

    /* ============================
       ✅ PUBLICADOS OK
    ============================ */
    for (const pub of response.Publicacion ?? []) {
      results.push({
        skuSeller: pub.SkuSeller,
        publicationId: pub.IdPublicacion,
        marketSku: pub.SkuMarket,
        status: MarketplacePublishStatus.PUBLISHED
      });
    }

    /* ============================
       ❌ / ⚠️ ERRORES
    ============================ */
    for (const err of response.Errors ?? []) {
      const message = err.ErrorMesage ?? 'Error Megatone';

      // SKU ya existente
      if (err.Target === 'SkuSeller' && message.toLowerCase().includes('existe')) {
        results.push({
          skuSeller: err.SkuSeller,
          status: MarketplacePublishStatus.SKIPPED,
          errors: [
            {
              target: err.Target,
              message
            }
          ]
        });
        continue;
      }

      // Error real
      results.push({
        skuSeller: err.SkuSeller,
        status: MarketplacePublishStatus.FAILED,
        errors: [
          {
            target: err.Target,
            message
          }
        ]
      });
    }

    /* ============================
       📊 MÉTRICAS
    ============================ */
    const total = payload.MasivaBulks.length;
    const published = results.filter(r => r.status === MarketplacePublishStatus.PUBLISHED).length;
    const skipped = results.filter(r => r.status === MarketplacePublishStatus.SKIPPED).length;
    const failed = results.filter(r => r.status === MarketplacePublishStatus.FAILED).length;

    let globalStatus: MarketplacePublishStatus = MarketplacePublishStatus.PUBLISHED;

    if (failed === total) {
      globalStatus = MarketplacePublishStatus.FAILED;
    } else if (failed > 0 || skipped > 0) {
      globalStatus = MarketplacePublishStatus.PARTIAL;
    }

    return {
      status: globalStatus,
      total,
      published,
      skipped,
      failed,
      items: results
    };
  }
}
