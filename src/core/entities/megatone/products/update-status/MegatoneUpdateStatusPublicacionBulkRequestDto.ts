import { UpdateStatusPublicacionBulkItemDto } from './dto/UpdateStatusPublicacionBulkItemDto';

export interface MegatoneUpdateStatusPublicacionBulkRequestDto {
  cambiarEstadoPublicacionesBulks: UpdateStatusPublicacionBulkItemDto[];
  IdUser: number;
}
