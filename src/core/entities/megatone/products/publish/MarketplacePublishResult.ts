import { MarketplacePublishStatus } from './MarketplacePublishStatus';
import { MarketplacePublishItemResult } from './MarketplacePublishItemResult';

export interface MarketplacePublishResult {
  status: MarketplacePublishStatus;
  total: number;
  published: number;
  skipped: number;
  failed: number;
  items: MarketplacePublishItemResult[];
}
