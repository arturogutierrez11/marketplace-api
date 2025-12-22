import { MegatoneErrorItemDto } from '../../delete/dto/MegatoneResponseDto';

export interface MegatoneBulkErrorItemDto {
  Target: string;
  ErrorAt: string;
  ErrorMesage: string;
  IdPublicacion: number;
}

export interface MegatoneBulkPublicationResultDto {
  IdPublicacion: number;
  SkuSeller: string;
  SkuMarket: string;
  PrecioActualizado: boolean;
  StockActualizado: boolean;
}

export interface MegatoneUpdatePriceStockBulkResponseDto {
  Errores?: MegatoneErrorItemDto[];
  Errors?: MegatoneBulkErrorItemDto[];
  HasErrors: boolean;
  TotalErrors: number;
  Publicacion?: MegatoneBulkPublicationResultDto[];
}
