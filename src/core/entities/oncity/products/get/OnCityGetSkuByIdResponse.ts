export interface OnCityGetSkuByIdResponse {
  skuId: number;
  productId: number;
  refId: string | null;
  ean: string | null;
  name: string;
  brand: string;
  isActive: boolean;
  DetailUrl: string;
}
