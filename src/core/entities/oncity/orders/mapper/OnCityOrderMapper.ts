import { OnCityOrder } from '../OnCityOrder';
import { OnCityOrderRawDto } from '../dto/OnCityOrderResponseDto';

export class OnCityOrderMapper {
  static toEntity(dto: OnCityOrderRawDto): OnCityOrder {
    const [nombre, ...apellido] = (dto.clientName ?? '').trim().split(' ').filter(Boolean);

    return {
      IdOrden: dto.sequence ? Number(dto.sequence) : null,
      Fecha: dto.creationDate ?? null,
      MontoVenta: dto.totalValue ?? null,

      Cliente: {
        Nombre: nombre || null,
        Apellido: apellido.join(' ') || null
      },

      Estado: [
        {
          IdEstado: null,
          Descripcion: dto.statusDescription ?? dto.status ?? null,
          Fecha: dto.lastChange ?? null
        }
      ],

      Productos: []
    };
  }
}
