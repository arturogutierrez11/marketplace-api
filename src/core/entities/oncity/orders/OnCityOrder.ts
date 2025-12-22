export interface MarketplaceOrder {
  orderId: string;
  createdAt: string;
  clientName: string;
  total: number;
  status: string;
  statusDescription: string;
  salesChannel: string;
  affiliateId: string;
  sequence: string;
}
