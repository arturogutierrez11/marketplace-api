export interface OnCityOrdersResponseDto {
  list: OnCityOrderRawDto[];
  paging: {
    total: number;
    pages: number;
    currentPage: number;
  };
}

export interface OnCityOrderRawDto {
  orderId: string;
  creationDate: string;
  clientName: string;
  totalValue: number;
  status: string;
  statusDescription: string;
  affiliateId: string;
  salesChannel: string;
  sequence: string;
  lastChange?: string;
}
