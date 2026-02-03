import { MegatoneOrder } from '../MegatoneOrder';

export interface MegatoneOrdersResponseDto {
  NumeroPagina: number;
  CantidadPagina: number;
  CantidadTotal: number;
  Elementos: MegatoneOrder[];
}
