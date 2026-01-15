import { MegatoneBulkUpdateStatus } from './MegatoneBulkUpdateStatus';
import { MegatoneBulkUpdateItemResult } from './MegatoneBulkUpdateItemResult';

export interface MarketplaceBulkUpdateResult {
  status: MegatoneBulkUpdateStatus;

  total: number;
  success: number;
  failed: number;

  items: MegatoneBulkUpdateItemResult[];
}
