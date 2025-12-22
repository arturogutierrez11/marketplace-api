import { MegatoneErrorItemDto } from '../../delete/dto/MegatoneResponseDto';
import { MegatonePublishErrorDto } from './MegatonePublishErrorDto';
import { MegatonePublishPublicationDto } from './MegatonePublishPublicationDto';

export interface MegatonePublishBulkResponseDto {
  Errores?: MegatoneErrorItemDto[];
  Errors?: MegatonePublishErrorDto[];
  HasErrors: boolean;
  TotalErrors: number;
  Publicacion?: MegatonePublishPublicationDto[];
}
