export interface OnCitySkuStock {
  total: number;
  available: number;
}

export interface IOnCityGetStockBySkuRepository {
  getBySku(skuId: number): Promise<OnCitySkuStock>;
}
