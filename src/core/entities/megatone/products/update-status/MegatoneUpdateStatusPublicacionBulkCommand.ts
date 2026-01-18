import { UpdateStatusPublicacionBulkItemDto } from './dto/UpdateStatusPublicacionBulkItemDto';

export interface MegatoneUpdateStatusPublicacionBulkCommand {
  cambiarEstadoPublicacionesBulks: UpdateStatusPublicacionBulkItemDto[];
  IdUser: number;
}
