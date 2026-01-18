import { MegatoneBulkErrorItemDto } from '../../update/dto/MegatoneUpdatePriceStockBulkResponseDto';
import { MegatoneBulkStatusErrorItemDto } from './MegatoneBulkStatusErrorItemDto';
import { MegatoneBulkStatusPublicationResultDto } from './MegatoneBulkStatusPublicationResultDto';

export interface MegatoneUpdateStatusPublicacionBulkResponseDto {
  Errores?: MegatoneBulkStatusErrorItemDto[];
  Errors?: MegatoneBulkErrorItemDto[];
  HasErrors: boolean;
  TotalErrors: number;
  Publicacion?: MegatoneBulkStatusPublicationResultDto[];
}
