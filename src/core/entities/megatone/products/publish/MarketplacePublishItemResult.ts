import { MarketplacePublishStatus } from './MarketplacePublishStatus';

export interface MarketplacePublishItemResult {
  skuSeller: string;
  publicationId?: number;
  marketSku?: string;
  status: MarketplacePublishStatus;
  errors?: {
    target?: string;
    message: string;
  }[];
}
