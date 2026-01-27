import { Inject, Injectable } from '@nestjs/common';
import { IOnCityGetPriceBySkuRepository } from 'src/core/adapters/repositories/oncity/products/get-price/IOnCityGetPriceBySkuRepository';
import { IOnCityGetStockBySkuRepository } from 'src/core/adapters/repositories/oncity/products/get-stock/IOnCityGetStockBySkuRepository';
import { IOnCityGetProductIdRepository } from 'src/core/adapters/repositories/oncity/products/get/IOnCityGetProductIdRepository';
import { IOnCityGetSkuByIdRepository } from 'src/core/adapters/repositories/oncity/products/get/IOnCityGetSkuByIdRepository';
import { OnCityGetProductIdRepository } from 'src/core/drivers/repositories/oncity/products/get/OnCityGetProductIdRepository';

type PublicationStatus = 'Activo' | 'Pausado' | 'Eliminado';

export interface OnCityPublicationItem {
  publicationId: number;
  sellerSku: string;
  marketSku: string;
  title: string;
  price: number;
  stock: number;
  status: PublicationStatus;
  linkPublicacion: string;
  images: string[];
}

export interface OnCityPublicationsResponse {
  items: OnCityPublicationItem[];
  total: number;
  limit: number;
  offset: number;
  count: number;
  hasNext: boolean;
  nextOffset: number | null;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function resolveStatus(params: { isActive: boolean; stock: number }): PublicationStatus {
  if (!params.isActive) return 'Pausado';
  if (params.stock <= 0) return 'Pausado';
  return 'Activo';
}
@Injectable()
export class GetOnCityPublicationsDetails {
  constructor(
    @Inject('IOnCityGetProductIdRepository')
    private readonly productIdsRepo: IOnCityGetProductIdRepository,
    @Inject('IOnCityGetSkuByIdRepository')
    private readonly skuRepo: IOnCityGetSkuByIdRepository,
    @Inject('IOnCityGetPriceBySkuRepository')
    private readonly priceRepo: IOnCityGetPriceBySkuRepository,
    @Inject('IOnCityGetStockBySkuRepository')
    private readonly stockRepo: IOnCityGetStockBySkuRepository
  ) {}

  async execute(params: { offset: number; limit: number }): Promise<OnCityPublicationsResponse> {
    const { offset, limit } = params;
    const to = offset + limit - 1;

    /* --------------------------- 1) Obtener IDs ---------------------------- */
    const response = await this.productIdsRepo.execute(offset, to);

    /* -------------------- 2) Extraer skuIds desde data --------------------- */
    const skuIds: number[] = [];

    for (const skus of Object.values(response.data)) {
      for (const skuId of skus) {
        skuIds.push(skuId);
      }
    }

    /* ---------------------- 3) Declarar items ------------------------------ */
    const items: OnCityPublicationItem[] = [];

    /* ---------------------- 4) Iteración controlada ------------------------ */
    for (const skuId of skuIds) {
      const sku = await this.skuRepo.executeRaw(skuId);
      const price = await this.priceRepo.getBySku(skuId);
      const stock = await this.stockRepo.getBySku(skuId);

      const availableStock = stock.available;

      items.push({
        publicationId: skuId,
        sellerSku: sku.AlternateIds?.RefId ?? skuId.toString(),
        marketSku: skuId.toString(),
        title: sku.NameComplete,
        price: price?.basePrice ?? 0,
        stock: availableStock,
        status: resolveStatus({
          isActive: sku.IsActive,
          stock: availableStock
        }),
        linkPublicacion: sku.DetailUrl ? `https://www.oncity.com${sku.DetailUrl}` : 'https://www.oncity.com',
        images: Array.isArray(sku.Images) ? sku.Images.map(img => img.ImageUrl) : []
      });

      await sleep(120);
    }

    /* ------------------------- 5) Metadata paginado ------------------------ */
    const hasNext = response.range.to < response.range.total;

    return {
      items,
      total: response.range.total,
      limit,
      offset,
      count: items.length,
      hasNext,
      nextOffset: hasNext ? response.range.to + 1 : null
    };
  }
}
