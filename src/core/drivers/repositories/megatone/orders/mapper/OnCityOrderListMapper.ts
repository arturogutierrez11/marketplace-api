import { MegatoneOrder } from 'src/core/entities/megatone/orders/MegatoneOrder';

export class MegatoneOrderMapper {
  static toEntity(dto: MegatoneOrder): MegatoneOrder {
    return dto;
  }
}
