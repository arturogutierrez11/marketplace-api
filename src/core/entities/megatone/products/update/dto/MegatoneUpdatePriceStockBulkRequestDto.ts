export interface MegatoneUpdatePriceStockBulkItemDto {
  IdPublicacion: number;

  PrecioLista?: number;
  PrecioPromocional?: number;
  Stock?: number;

  AlicuotaIva?: number;
  AlicuotaImpuestoInterno?: number;
}

export interface MegatoneUpdatePriceStockBulkRequestDto {
  IdUser: number;
  actualizarPrecioYStockBulks: MegatoneUpdatePriceStockBulkItemDto[];
}
