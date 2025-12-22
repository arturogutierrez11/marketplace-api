export interface MegatoneBulkUpdateItemResult {
  publicationId: number;
  priceUpdated: boolean;
  stockUpdated: boolean;
  errors?: {
    code?: string;
    message: string;
    target?: string;
  }[];
}
