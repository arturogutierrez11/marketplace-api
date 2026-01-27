export interface OnCitySkuPrice {
  basePrice: number | null;
  listPrice: number | null;
}

export interface IOnCityGetPriceBySkuRepository {
  getBySku(skuId: number): Promise<OnCitySkuPrice | null>;
}
