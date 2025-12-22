import { MarketplaceDeleteStatus } from './MarketplaceDeleteStatus';

export interface MarketplaceDeleteResult {
  publicationId: number;
  sellerSku?: string;
  status: MarketplaceDeleteStatus;
  errors?: {
    code: string;
    message: string;
  }[];
}
