import { MegatoneBulkUpdateItemResult } from './MegatoneBulkUpdateItemResult';
import { MegatoneBulkUpdateStatus } from './MegatoneBulkUpdateStatus';

export interface MarketplaceBulkUpdateResult {
  status: MegatoneBulkUpdateStatus;
  total: number;
  success: number;
  failed: number;
  items: MegatoneBulkUpdateItemResult[];
}
